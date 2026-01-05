import { defineComponent as vi, createElementBlock as St, openBlock as kt, withDirectives as Rn, createElementVNode as at, toDisplayString as Et, vShow as Cn, Fragment as dr, renderList as Fr, unref as gr, computed as Br, onMounted as ws, onUnmounted as ys, ref as jr, reactive as vs, createVNode as bs } from "vue";
const _s = { class: "graph-controller__controls-overview" }, xs = { key: 0 }, Es = { key: 1 }, Ss = { key: 0 }, ks = { key: 1 }, Ms = /* @__PURE__ */ vi({
  __name: "GraphControls",
  props: {
    showHeader: { type: Boolean },
    showControlsGraph: { type: Boolean },
    showLatexInfo: { type: Boolean },
    showControlsEnvironment: { type: Boolean },
    platformType: {}
  },
  setup(e) {
    const t = e, n = [
      {
        action: "Create node",
        desktop: "Double-click",
        touch: "Double-tap"
      },
      {
        action: "Create link",
        desktop: "Right-click on node + hold + drag towards target",
        touch: "Hold + drag"
      },
      {
        action: "Delete node/link",
        desktop: "Right-click + hold",
        touch: "Touch + hold"
      },
      {
        action: "Move node",
        desktop: "Left-click + hold on node + drag",
        touch: "-"
      },
      {
        action: "Create/Update label",
        desktop: t.showLatexInfo ? "Left-click on label, $$ for $\\LaTeX$" : "Left-click on label",
        touch: t.showLatexInfo ? "Tap on label, $$ for $\\LaTeX$" : "Tap on label"
      }
    ], l = [
      {
        action: "Pan",
        desktop: "Left-click on canvas + hold + drag",
        touch: "Multi-touch"
      },
      {
        action: "Zoom",
        desktop: "Mouse wheel",
        touch: "Multi-touch"
      }
    ], a = ["Action", "Controls"];
    let h = t.platformType === "mobile" || t.platformType === "tablet";
    return (c, f) => (kt(), St("table", _s, [
      Rn(at("thead", null, [
        at("tr", null, [
          at("th", null, Et(a[0]), 1),
          at("th", null, Et(a[1]), 1)
        ])
      ], 512), [
        [Cn, t.showHeader]
      ]),
      at("tbody", null, [
        (kt(), St(dr, null, Fr(n, (p) => Rn(at("tr", {
          key: p.action
        }, [
          at("td", null, Et(p.action), 1),
          gr(h) ? (kt(), St("td", xs, Et(p.touch), 1)) : (kt(), St("td", Es, Et(p.desktop), 1))
        ]), [
          [Cn, t.showControlsGraph]
        ])), 64)),
        (kt(), St(dr, null, Fr(l, (p) => Rn(at("tr", {
          key: p.action
        }, [
          at("td", null, Et(p.action), 1),
          gr(h) ? (kt(), St("td", Ss, Et(p.touch), 1)) : (kt(), St("td", ks, Et(p.desktop), 1))
        ]), [
          [Cn, t.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), Ns = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, a] of t)
    n[l] = a;
  return n;
}, Ls = /* @__PURE__ */ Ns(Ms, [["__scopeId", "data-v-8c3d818f"]]);
var Ts = { value: () => {
} };
function gn() {
  for (var e = 0, t = arguments.length, n = {}, l; e < t; ++e) {
    if (!(l = arguments[e] + "") || l in n || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    n[l] = [];
  }
  return new In(n);
}
function In(e) {
  this._ = e;
}
function Rs(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var l = "", a = n.indexOf(".");
    if (a >= 0 && (l = n.slice(a + 1), n = n.slice(0, a)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: l };
  });
}
In.prototype = gn.prototype = {
  constructor: In,
  on: function(e, t) {
    var n = this._, l = Rs(e + "", n), a, h = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++h < c; ) if ((a = (e = l[h]).type) && (a = Cs(n[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++h < c; )
      if (a = (e = l[h]).type) n[a] = Dr(n[a], e.name, t);
      else if (t == null) for (a in n) n[a] = Dr(n[a], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new In(e);
  },
  call: function(e, t) {
    if ((a = arguments.length - 2) > 0) for (var n = new Array(a), l = 0, a, h; l < a; ++l) n[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (h = this._[e], l = 0, a = h.length; l < a; ++l) h[l].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var l = this._[e], a = 0, h = l.length; a < h; ++a) l[a].value.apply(t, n);
  }
};
function Cs(e, t) {
  for (var n = 0, l = e.length, a; n < l; ++n)
    if ((a = e[n]).name === t)
      return a.value;
}
function Dr(e, t, n) {
  for (var l = 0, a = e.length; l < a; ++l)
    if (e[l].name === t) {
      e[l] = Ts, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var pr = "http://www.w3.org/1999/xhtml";
const Gr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Yn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Gr.hasOwnProperty(t) ? { space: Gr[t], local: e } : e;
}
function Is(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === pr && t.documentElement.namespaceURI === pr ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Ps(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function bi(e) {
  var t = Yn(e);
  return (t.local ? Ps : Is)(t);
}
function zs() {
}
function Mr(e) {
  return e == null ? zs : function() {
    return this.querySelector(e);
  };
}
function $s(e) {
  typeof e != "function" && (e = Mr(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = new Array(c), p, g, v = 0; v < c; ++v)
      (p = h[v]) && (g = e.call(p, p.__data__, v, h)) && ("__data__" in p && (g.__data__ = p.__data__), f[v] = g);
  return new rt(l, this._parents);
}
function Os(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function As() {
  return [];
}
function _i(e) {
  return e == null ? As : function() {
    return this.querySelectorAll(e);
  };
}
function Fs(e) {
  return function() {
    return Os(e.apply(this, arguments));
  };
}
function Bs(e) {
  typeof e == "function" ? e = Fs(e) : e = _i(e);
  for (var t = this._groups, n = t.length, l = [], a = [], h = 0; h < n; ++h)
    for (var c = t[h], f = c.length, p, g = 0; g < f; ++g)
      (p = c[g]) && (l.push(e.call(p, p.__data__, g, c)), a.push(p));
  return new rt(l, a);
}
function xi(e) {
  return function() {
    return this.matches(e);
  };
}
function Ei(e) {
  return function(t) {
    return t.matches(e);
  };
}
var js = Array.prototype.find;
function Ds(e) {
  return function() {
    return js.call(this.children, e);
  };
}
function Gs() {
  return this.firstElementChild;
}
function Vs(e) {
  return this.select(e == null ? Gs : Ds(typeof e == "function" ? e : Ei(e)));
}
var qs = Array.prototype.filter;
function Us() {
  return Array.from(this.children);
}
function Ws(e) {
  return function() {
    return qs.call(this.children, e);
  };
}
function Xs(e) {
  return this.selectAll(e == null ? Us : Ws(typeof e == "function" ? e : Ei(e)));
}
function Qs(e) {
  typeof e != "function" && (e = xi(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = [], p, g = 0; g < c; ++g)
      (p = h[g]) && e.call(p, p.__data__, g, h) && f.push(p);
  return new rt(l, this._parents);
}
function Si(e) {
  return new Array(e.length);
}
function Ys() {
  return new rt(this._enter || this._groups.map(Si), this._parents);
}
function Bn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Bn.prototype = {
  constructor: Bn,
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
function Js(e) {
  return function() {
    return e;
  };
}
function Zs(e, t, n, l, a, h) {
  for (var c = 0, f, p = t.length, g = h.length; c < g; ++c)
    (f = t[c]) ? (f.__data__ = h[c], l[c] = f) : n[c] = new Bn(e, h[c]);
  for (; c < p; ++c)
    (f = t[c]) && (a[c] = f);
}
function Ks(e, t, n, l, a, h, c) {
  var f, p, g = /* @__PURE__ */ new Map(), v = t.length, m = h.length, x = new Array(v), R;
  for (f = 0; f < v; ++f)
    (p = t[f]) && (x[f] = R = c.call(p, p.__data__, f, t) + "", g.has(R) ? a[f] = p : g.set(R, p));
  for (f = 0; f < m; ++f)
    R = c.call(e, h[f], f, h) + "", (p = g.get(R)) ? (l[f] = p, p.__data__ = h[f], g.delete(R)) : n[f] = new Bn(e, h[f]);
  for (f = 0; f < v; ++f)
    (p = t[f]) && g.get(x[f]) === p && (a[f] = p);
}
function Hs(e) {
  return e.__data__;
}
function eo(e, t) {
  if (!arguments.length) return Array.from(this, Hs);
  var n = t ? Ks : Zs, l = this._parents, a = this._groups;
  typeof e != "function" && (e = Js(e));
  for (var h = a.length, c = new Array(h), f = new Array(h), p = new Array(h), g = 0; g < h; ++g) {
    var v = l[g], m = a[g], x = m.length, R = to(e.call(v, v && v.__data__, g, l)), P = R.length, F = f[g] = new Array(P), A = c[g] = new Array(P), M = p[g] = new Array(x);
    n(v, m, F, A, M, R, t);
    for (var D = 0, q = 0, I, V; D < P; ++D)
      if (I = F[D]) {
        for (D >= q && (q = D + 1); !(V = A[q]) && ++q < P; ) ;
        I._next = V || null;
      }
  }
  return c = new rt(c, l), c._enter = f, c._exit = p, c;
}
function to(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function no() {
  return new rt(this._exit || this._groups.map(Si), this._parents);
}
function ro(e, t, n) {
  var l = this.enter(), a = this, h = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), t != null && (a = t(a), a && (a = a.selection())), n == null ? h.remove() : n(h), l && a ? l.merge(a).order() : a;
}
function io(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, l = t._groups, a = n.length, h = l.length, c = Math.min(a, h), f = new Array(a), p = 0; p < c; ++p)
    for (var g = n[p], v = l[p], m = g.length, x = f[p] = new Array(m), R, P = 0; P < m; ++P)
      (R = g[P] || v[P]) && (x[P] = R);
  for (; p < a; ++p)
    f[p] = n[p];
  return new rt(f, this._parents);
}
function so() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var l = e[t], a = l.length - 1, h = l[a], c; --a >= 0; )
      (c = l[a]) && (h && c.compareDocumentPosition(h) ^ 4 && h.parentNode.insertBefore(c, h), h = c);
  return this;
}
function oo(e) {
  e || (e = lo);
  function t(m, x) {
    return m && x ? e(m.__data__, x.__data__) : !m - !x;
  }
  for (var n = this._groups, l = n.length, a = new Array(l), h = 0; h < l; ++h) {
    for (var c = n[h], f = c.length, p = a[h] = new Array(f), g, v = 0; v < f; ++v)
      (g = c[v]) && (p[v] = g);
    p.sort(t);
  }
  return new rt(a, this._parents).order();
}
function lo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ao() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function uo() {
  return Array.from(this);
}
function ho() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var l = e[t], a = 0, h = l.length; a < h; ++a) {
      var c = l[a];
      if (c) return c;
    }
  return null;
}
function co() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function fo() {
  return !this.node();
}
function go(e) {
  for (var t = this._groups, n = 0, l = t.length; n < l; ++n)
    for (var a = t[n], h = 0, c = a.length, f; h < c; ++h)
      (f = a[h]) && e.call(f, f.__data__, h, a);
  return this;
}
function po(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function mo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function wo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function yo(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function vo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function bo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function _o(e, t) {
  var n = Yn(e);
  if (arguments.length < 2) {
    var l = this.node();
    return n.local ? l.getAttributeNS(n.space, n.local) : l.getAttribute(n);
  }
  return this.each((t == null ? n.local ? mo : po : typeof t == "function" ? n.local ? bo : vo : n.local ? yo : wo)(n, t));
}
function ki(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function xo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Eo(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function So(e, t, n) {
  return function() {
    var l = t.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, n);
  };
}
function ko(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? xo : typeof t == "function" ? So : Eo)(e, t, n ?? "")) : Xt(this.node(), e);
}
function Xt(e, t) {
  return e.style.getPropertyValue(t) || ki(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Mo(e) {
  return function() {
    delete this[e];
  };
}
function No(e, t) {
  return function() {
    this[e] = t;
  };
}
function Lo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function To(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Mo : typeof t == "function" ? Lo : No)(e, t)) : this.node()[e];
}
function Mi(e) {
  return e.trim().split(/^|\s+/);
}
function Nr(e) {
  return e.classList || new Ni(e);
}
function Ni(e) {
  this._node = e, this._names = Mi(e.getAttribute("class") || "");
}
Ni.prototype = {
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
function Li(e, t) {
  for (var n = Nr(e), l = -1, a = t.length; ++l < a; ) n.add(t[l]);
}
function Ti(e, t) {
  for (var n = Nr(e), l = -1, a = t.length; ++l < a; ) n.remove(t[l]);
}
function Ro(e) {
  return function() {
    Li(this, e);
  };
}
function Co(e) {
  return function() {
    Ti(this, e);
  };
}
function Io(e, t) {
  return function() {
    (t.apply(this, arguments) ? Li : Ti)(this, e);
  };
}
function Po(e, t) {
  var n = Mi(e + "");
  if (arguments.length < 2) {
    for (var l = Nr(this.node()), a = -1, h = n.length; ++a < h; ) if (!l.contains(n[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Io : t ? Ro : Co)(n, t));
}
function zo() {
  this.textContent = "";
}
function $o(e) {
  return function() {
    this.textContent = e;
  };
}
function Oo(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ao(e) {
  return arguments.length ? this.each(e == null ? zo : (typeof e == "function" ? Oo : $o)(e)) : this.node().textContent;
}
function Fo() {
  this.innerHTML = "";
}
function Bo(e) {
  return function() {
    this.innerHTML = e;
  };
}
function jo(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Do(e) {
  return arguments.length ? this.each(e == null ? Fo : (typeof e == "function" ? jo : Bo)(e)) : this.node().innerHTML;
}
function Go() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vo() {
  return this.each(Go);
}
function qo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Uo() {
  return this.each(qo);
}
function Wo(e) {
  var t = typeof e == "function" ? e : bi(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Xo() {
  return null;
}
function Qo(e, t) {
  var n = typeof e == "function" ? e : bi(e), l = t == null ? Xo : typeof t == "function" ? t : Mr(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function Yo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Jo() {
  return this.each(Yo);
}
function Zo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ko() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ho(e) {
  return this.select(e ? Ko : Zo);
}
function el(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function tl(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function nl(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", l = t.indexOf(".");
    return l >= 0 && (n = t.slice(l + 1), t = t.slice(0, l)), { type: t, name: n };
  });
}
function rl(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, l = -1, a = t.length, h; n < a; ++n)
        h = t[n], (!e.type || h.type === e.type) && h.name === e.name ? this.removeEventListener(h.type, h.listener, h.options) : t[++l] = h;
      ++l ? t.length = l : delete this.__on;
    }
  };
}
function il(e, t, n) {
  return function() {
    var l = this.__on, a, h = tl(t);
    if (l) {
      for (var c = 0, f = l.length; c < f; ++c)
        if ((a = l[c]).type === e.type && a.name === e.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = h, a.options = n), a.value = t;
          return;
        }
    }
    this.addEventListener(e.type, h, n), a = { type: e.type, name: e.name, value: t, listener: h, options: n }, l ? l.push(a) : this.__on = [a];
  };
}
function sl(e, t, n) {
  var l = nl(e + ""), a, h = l.length, c;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var p = 0, g = f.length, v; p < g; ++p)
        for (a = 0, v = f[p]; a < h; ++a)
          if ((c = l[a]).type === v.type && c.name === v.name)
            return v.value;
    }
    return;
  }
  for (f = t ? il : rl, a = 0; a < h; ++a) this.each(f(l[a], t, n));
  return this;
}
function Ri(e, t, n) {
  var l = ki(e), a = l.CustomEvent;
  typeof a == "function" ? a = new a(t, n) : (a = l.document.createEvent("Event"), n ? (a.initEvent(t, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
}
function ol(e, t) {
  return function() {
    return Ri(this, e, t);
  };
}
function ll(e, t) {
  return function() {
    return Ri(this, e, t.apply(this, arguments));
  };
}
function al(e, t) {
  return this.each((typeof t == "function" ? ll : ol)(e, t));
}
function* ul() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var l = e[t], a = 0, h = l.length, c; a < h; ++a)
      (c = l[a]) && (yield c);
}
var Ci = [null];
function rt(e, t) {
  this._groups = e, this._parents = t;
}
function pn() {
  return new rt([[document.documentElement]], Ci);
}
function hl() {
  return this;
}
rt.prototype = pn.prototype = {
  constructor: rt,
  select: $s,
  selectAll: Bs,
  selectChild: Vs,
  selectChildren: Xs,
  filter: Qs,
  data: eo,
  enter: Ys,
  exit: no,
  join: ro,
  merge: io,
  selection: hl,
  order: so,
  sort: oo,
  call: ao,
  nodes: uo,
  node: ho,
  size: co,
  empty: fo,
  each: go,
  attr: _o,
  style: ko,
  property: To,
  classed: Po,
  text: Ao,
  html: Do,
  raise: Vo,
  lower: Uo,
  append: Wo,
  insert: Qo,
  remove: Jo,
  clone: Ho,
  datum: el,
  on: sl,
  dispatch: al,
  [Symbol.iterator]: ul
};
function _e(e) {
  return typeof e == "string" ? new rt([[document.querySelector(e)]], [document.documentElement]) : new rt([[e]], Ci);
}
function Ii(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function it(e, t) {
  if (e = Ii(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var l = n.createSVGPoint();
      return l.x = e.clientX, l.y = e.clientY, l = l.matrixTransform(t.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (t.getBoundingClientRect) {
      var a = t.getBoundingClientRect();
      return [e.clientX - a.left - t.clientLeft, e.clientY - a.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
function cl(e, t) {
  return e.target && (e = Ii(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => it(n, t));
}
const fl = { passive: !1 }, ln = { capture: !0, passive: !1 };
function lr(e) {
  e.stopImmediatePropagation();
}
function Ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Pi(e) {
  var t = e.document.documentElement, n = _e(e).on("dragstart.drag", Ut, ln);
  "onselectstart" in t ? n.on("selectstart.drag", Ut, ln) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function zi(e, t) {
  var n = e.document.documentElement, l = _e(e).on("dragstart.drag", null);
  t && (l.on("click.drag", Ut, ln), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in n ? l.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const En = (e) => () => e;
function mr(e, {
  sourceEvent: t,
  subject: n,
  target: l,
  identifier: a,
  active: h,
  x: c,
  y: f,
  dx: p,
  dy: g,
  dispatch: v
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    identifier: { value: a, enumerable: !0, configurable: !0 },
    active: { value: h, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: f, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: g, enumerable: !0, configurable: !0 },
    _: { value: v }
  });
}
mr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function dl(e) {
  return !e.ctrlKey && !e.button;
}
function gl() {
  return this.parentNode;
}
function pl(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function ml() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function wl() {
  var e = dl, t = gl, n = pl, l = ml, a = {}, h = gn("start", "drag", "end"), c = 0, f, p, g, v, m = 0;
  function x(I) {
    I.on("mousedown.drag", R).filter(l).on("touchstart.drag", A).on("touchmove.drag", M, fl).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function R(I, V) {
    if (!(v || !e.call(this, I, V))) {
      var K = q(this, t.call(this, I, V), I, V, "mouse");
      K && (_e(I.view).on("mousemove.drag", P, ln).on("mouseup.drag", F, ln), Pi(I.view), lr(I), g = !1, f = I.clientX, p = I.clientY, K("start", I));
    }
  }
  function P(I) {
    if (Ut(I), !g) {
      var V = I.clientX - f, K = I.clientY - p;
      g = V * V + K * K > m;
    }
    a.mouse("drag", I);
  }
  function F(I) {
    _e(I.view).on("mousemove.drag mouseup.drag", null), zi(I.view, g), Ut(I), a.mouse("end", I);
  }
  function A(I, V) {
    if (e.call(this, I, V)) {
      var K = I.changedTouches, ee = t.call(this, I, V), le = K.length, de, H;
      for (de = 0; de < le; ++de)
        (H = q(this, ee, I, V, K[de].identifier, K[de])) && (lr(I), H("start", I, K[de]));
    }
  }
  function M(I) {
    var V = I.changedTouches, K = V.length, ee, le;
    for (ee = 0; ee < K; ++ee)
      (le = a[V[ee].identifier]) && (Ut(I), le("drag", I, V[ee]));
  }
  function D(I) {
    var V = I.changedTouches, K = V.length, ee, le;
    for (v && clearTimeout(v), v = setTimeout(function() {
      v = null;
    }, 500), ee = 0; ee < K; ++ee)
      (le = a[V[ee].identifier]) && (lr(I), le("end", I, V[ee]));
  }
  function q(I, V, K, ee, le, de) {
    var H = h.copy(), ce = it(de || K, V), ve, re, z;
    if ((z = n.call(I, new mr("beforestart", {
      sourceEvent: K,
      target: x,
      identifier: le,
      active: c,
      x: ce[0],
      y: ce[1],
      dx: 0,
      dy: 0,
      dispatch: H
    }), ee)) != null)
      return ve = z.x - ce[0] || 0, re = z.y - ce[1] || 0, function Z(W, ie, oe) {
        var he = ce, fe;
        switch (W) {
          case "start":
            a[le] = Z, fe = c++;
            break;
          case "end":
            delete a[le], --c;
          // falls through
          case "drag":
            ce = it(oe || ie, V), fe = c;
            break;
        }
        H.call(
          W,
          I,
          new mr(W, {
            sourceEvent: ie,
            subject: z,
            target: x,
            identifier: le,
            active: fe,
            x: ce[0] + ve,
            y: ce[1] + re,
            dx: ce[0] - he[0],
            dy: ce[1] - he[1],
            dispatch: H
          }),
          ee
        );
      };
  }
  return x.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : En(!!I), x) : e;
  }, x.container = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : En(I), x) : t;
  }, x.subject = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : En(I), x) : n;
  }, x.touchable = function(I) {
    return arguments.length ? (l = typeof I == "function" ? I : En(!!I), x) : l;
  }, x.on = function() {
    var I = h.on.apply(h, arguments);
    return I === h ? x : I;
  }, x.clickDistance = function(I) {
    return arguments.length ? (m = (I = +I) * I, x) : Math.sqrt(m);
  }, x;
}
function Lr(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function $i(e, t) {
  var n = Object.create(e.prototype);
  for (var l in t) n[l] = t[l];
  return n;
}
function mn() {
}
var an = 0.7, jn = 1 / an, Wt = "\\s*([+-]?\\d+)\\s*", un = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", yl = /^#([0-9a-f]{3,8})$/, vl = new RegExp(`^rgb\\(${Wt},${Wt},${Wt}\\)$`), bl = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), _l = new RegExp(`^rgba\\(${Wt},${Wt},${Wt},${un}\\)$`), xl = new RegExp(`^rgba\\(${mt},${mt},${mt},${un}\\)$`), El = new RegExp(`^hsl\\(${un},${mt},${mt}\\)$`), Sl = new RegExp(`^hsla\\(${un},${mt},${mt},${un}\\)$`), Vr = {
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
Lr(mn, Bt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: qr,
  // Deprecated! Use color.formatHex.
  formatHex: qr,
  formatHex8: kl,
  formatHsl: Ml,
  formatRgb: Ur,
  toString: Ur
});
function qr() {
  return this.rgb().formatHex();
}
function kl() {
  return this.rgb().formatHex8();
}
function Ml() {
  return Oi(this).formatHsl();
}
function Ur() {
  return this.rgb().formatRgb();
}
function Bt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = yl.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Wr(t) : n === 3 ? new Ze(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Sn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Sn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = vl.exec(e)) ? new Ze(t[1], t[2], t[3], 1) : (t = bl.exec(e)) ? new Ze(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = _l.exec(e)) ? Sn(t[1], t[2], t[3], t[4]) : (t = xl.exec(e)) ? Sn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = El.exec(e)) ? Yr(t[1], t[2] / 100, t[3] / 100, 1) : (t = Sl.exec(e)) ? Yr(t[1], t[2] / 100, t[3] / 100, t[4]) : Vr.hasOwnProperty(e) ? Wr(Vr[e]) : e === "transparent" ? new Ze(NaN, NaN, NaN, 0) : null;
}
function Wr(e) {
  return new Ze(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Sn(e, t, n, l) {
  return l <= 0 && (e = t = n = NaN), new Ze(e, t, n, l);
}
function Nl(e) {
  return e instanceof mn || (e = Bt(e)), e ? (e = e.rgb(), new Ze(e.r, e.g, e.b, e.opacity)) : new Ze();
}
function wr(e, t, n, l) {
  return arguments.length === 1 ? Nl(e) : new Ze(e, t, n, l ?? 1);
}
function Ze(e, t, n, l) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +l;
}
Lr(Ze, wr, $i(mn, {
  brighter(e) {
    return e = e == null ? jn : Math.pow(jn, e), new Ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? an : Math.pow(an, e), new Ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ze(Ft(this.r), Ft(this.g), Ft(this.b), Dn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Xr,
  // Deprecated! Use color.formatHex.
  formatHex: Xr,
  formatHex8: Ll,
  formatRgb: Qr,
  toString: Qr
}));
function Xr() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}`;
}
function Ll() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}${At((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Qr() {
  const e = Dn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ft(this.r)}, ${Ft(this.g)}, ${Ft(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Dn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ft(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function At(e) {
  return e = Ft(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Yr(e, t, n, l) {
  return l <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ut(e, t, n, l);
}
function Oi(e) {
  if (e instanceof ut) return new ut(e.h, e.s, e.l, e.opacity);
  if (e instanceof mn || (e = Bt(e)), !e) return new ut();
  if (e instanceof ut) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, l = e.b / 255, a = Math.min(t, n, l), h = Math.max(t, n, l), c = NaN, f = h - a, p = (h + a) / 2;
  return f ? (t === h ? c = (n - l) / f + (n < l) * 6 : n === h ? c = (l - t) / f + 2 : c = (t - n) / f + 4, f /= p < 0.5 ? h + a : 2 - h - a, c *= 60) : f = p > 0 && p < 1 ? 0 : c, new ut(c, f, p, e.opacity);
}
function Tl(e, t, n, l) {
  return arguments.length === 1 ? Oi(e) : new ut(e, t, n, l ?? 1);
}
function ut(e, t, n, l) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +l;
}
Lr(ut, Tl, $i(mn, {
  brighter(e) {
    return e = e == null ? jn : Math.pow(jn, e), new ut(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? an : Math.pow(an, e), new ut(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, l = n + (n < 0.5 ? n : 1 - n) * t, a = 2 * n - l;
    return new Ze(
      ar(e >= 240 ? e - 240 : e + 120, a, l),
      ar(e, a, l),
      ar(e < 120 ? e + 240 : e - 120, a, l),
      this.opacity
    );
  },
  clamp() {
    return new ut(Jr(this.h), kn(this.s), kn(this.l), Dn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Dn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Jr(this.h)}, ${kn(this.s) * 100}%, ${kn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Jr(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function kn(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ar(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Tr = (e) => () => e;
function Rl(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Cl(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(l) {
    return Math.pow(e + l * t, n);
  };
}
function Il(e) {
  return (e = +e) == 1 ? Ai : function(t, n) {
    return n - t ? Cl(t, n, e) : Tr(isNaN(t) ? n : t);
  };
}
function Ai(e, t) {
  var n = t - e;
  return n ? Rl(e, n) : Tr(isNaN(e) ? t : e);
}
const Gn = (function e(t) {
  var n = Il(t);
  function l(a, h) {
    var c = n((a = wr(a)).r, (h = wr(h)).r), f = n(a.g, h.g), p = n(a.b, h.b), g = Ai(a.opacity, h.opacity);
    return function(v) {
      return a.r = c(v), a.g = f(v), a.b = p(v), a.opacity = g(v), a + "";
    };
  }
  return l.gamma = e, l;
})(1);
function Pl(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, l = t.slice(), a;
  return function(h) {
    for (a = 0; a < n; ++a) l[a] = e[a] * (1 - h) + t[a] * h;
    return l;
  };
}
function zl(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function $l(e, t) {
  var n = t ? t.length : 0, l = e ? Math.min(n, e.length) : 0, a = new Array(l), h = new Array(n), c;
  for (c = 0; c < l; ++c) a[c] = Rr(e[c], t[c]);
  for (; c < n; ++c) h[c] = t[c];
  return function(f) {
    for (c = 0; c < l; ++c) h[c] = a[c](f);
    return h;
  };
}
function Ol(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(l) {
    return n.setTime(e * (1 - l) + t * l), n;
  };
}
function pt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function Al(e, t) {
  var n = {}, l = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? n[a] = Rr(e[a], t[a]) : l[a] = t[a];
  return function(h) {
    for (a in n) l[a] = n[a](h);
    return l;
  };
}
var yr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ur = new RegExp(yr.source, "g");
function Fl(e) {
  return function() {
    return e;
  };
}
function Bl(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Fi(e, t) {
  var n = yr.lastIndex = ur.lastIndex = 0, l, a, h, c = -1, f = [], p = [];
  for (e = e + "", t = t + ""; (l = yr.exec(e)) && (a = ur.exec(t)); )
    (h = a.index) > n && (h = t.slice(n, h), f[c] ? f[c] += h : f[++c] = h), (l = l[0]) === (a = a[0]) ? f[c] ? f[c] += a : f[++c] = a : (f[++c] = null, p.push({ i: c, x: pt(l, a) })), n = ur.lastIndex;
  return n < t.length && (h = t.slice(n), f[c] ? f[c] += h : f[++c] = h), f.length < 2 ? p[0] ? Bl(p[0].x) : Fl(t) : (t = p.length, function(g) {
    for (var v = 0, m; v < t; ++v) f[(m = p[v]).i] = m.x(g);
    return f.join("");
  });
}
function Rr(e, t) {
  var n = typeof t, l;
  return t == null || n === "boolean" ? Tr(t) : (n === "number" ? pt : n === "string" ? (l = Bt(t)) ? (t = l, Gn) : Fi : t instanceof Bt ? Gn : t instanceof Date ? Ol : zl(t) ? Pl : Array.isArray(t) ? $l : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Al : pt)(e, t);
}
var Zr = 180 / Math.PI, vr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Bi(e, t, n, l, a, h) {
  var c, f, p;
  return (c = Math.sqrt(e * e + t * t)) && (e /= c, t /= c), (p = e * n + t * l) && (n -= e * p, l -= t * p), (f = Math.sqrt(n * n + l * l)) && (n /= f, l /= f, p /= f), e * l < t * n && (e = -e, t = -t, p = -p, c = -c), {
    translateX: a,
    translateY: h,
    rotate: Math.atan2(t, e) * Zr,
    skewX: Math.atan(p) * Zr,
    scaleX: c,
    scaleY: f
  };
}
var Mn;
function jl(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? vr : Bi(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Dl(e) {
  return e == null || (Mn || (Mn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Mn.setAttribute("transform", e), !(e = Mn.transform.baseVal.consolidate())) ? vr : (e = e.matrix, Bi(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ji(e, t, n, l) {
  function a(g) {
    return g.length ? g.pop() + " " : "";
  }
  function h(g, v, m, x, R, P) {
    if (g !== m || v !== x) {
      var F = R.push("translate(", null, t, null, n);
      P.push({ i: F - 4, x: pt(g, m) }, { i: F - 2, x: pt(v, x) });
    } else (m || x) && R.push("translate(" + m + t + x + n);
  }
  function c(g, v, m, x) {
    g !== v ? (g - v > 180 ? v += 360 : v - g > 180 && (g += 360), x.push({ i: m.push(a(m) + "rotate(", null, l) - 2, x: pt(g, v) })) : v && m.push(a(m) + "rotate(" + v + l);
  }
  function f(g, v, m, x) {
    g !== v ? x.push({ i: m.push(a(m) + "skewX(", null, l) - 2, x: pt(g, v) }) : v && m.push(a(m) + "skewX(" + v + l);
  }
  function p(g, v, m, x, R, P) {
    if (g !== m || v !== x) {
      var F = R.push(a(R) + "scale(", null, ",", null, ")");
      P.push({ i: F - 4, x: pt(g, m) }, { i: F - 2, x: pt(v, x) });
    } else (m !== 1 || x !== 1) && R.push(a(R) + "scale(" + m + "," + x + ")");
  }
  return function(g, v) {
    var m = [], x = [];
    return g = e(g), v = e(v), h(g.translateX, g.translateY, v.translateX, v.translateY, m, x), c(g.rotate, v.rotate, m, x), f(g.skewX, v.skewX, m, x), p(g.scaleX, g.scaleY, v.scaleX, v.scaleY, m, x), g = v = null, function(R) {
      for (var P = -1, F = x.length, A; ++P < F; ) m[(A = x[P]).i] = A.x(R);
      return m.join("");
    };
  };
}
var Gl = ji(jl, "px, ", "px)", "deg)"), Vl = ji(Dl, ", ", ")", ")"), ql = 1e-12;
function Kr(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Ul(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Wl(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Xl = (function e(t, n, l) {
  function a(h, c) {
    var f = h[0], p = h[1], g = h[2], v = c[0], m = c[1], x = c[2], R = v - f, P = m - p, F = R * R + P * P, A, M;
    if (F < ql)
      M = Math.log(x / g) / t, A = function(ee) {
        return [
          f + ee * R,
          p + ee * P,
          g * Math.exp(t * ee * M)
        ];
      };
    else {
      var D = Math.sqrt(F), q = (x * x - g * g + l * F) / (2 * g * n * D), I = (x * x - g * g - l * F) / (2 * x * n * D), V = Math.log(Math.sqrt(q * q + 1) - q), K = Math.log(Math.sqrt(I * I + 1) - I);
      M = (K - V) / t, A = function(ee) {
        var le = ee * M, de = Kr(V), H = g / (n * D) * (de * Wl(t * le + V) - Ul(V));
        return [
          f + H * R,
          p + H * P,
          g * de / Kr(t * le + V)
        ];
      };
    }
    return A.duration = M * 1e3 * t / Math.SQRT2, A;
  }
  return a.rho = function(h) {
    var c = Math.max(1e-3, +h), f = c * c, p = f * f;
    return e(c, f, p);
  }, a;
})(Math.SQRT2, 2, 4);
var Qt = 0, tn = 0, Ht = 0, Di = 1e3, Vn, nn, qn = 0, jt = 0, Jn = 0, hn = typeof performance == "object" && performance.now ? performance : Date, Gi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Cr() {
  return jt || (Gi(Ql), jt = hn.now() + Jn);
}
function Ql() {
  jt = 0;
}
function Un() {
  this._call = this._time = this._next = null;
}
Un.prototype = Ir.prototype = {
  constructor: Un,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Cr() : +n) + (t == null ? 0 : +t), !this._next && nn !== this && (nn ? nn._next = this : Vn = this, nn = this), this._call = e, this._time = n, br();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, br());
  }
};
function Ir(e, t, n) {
  var l = new Un();
  return l.restart(e, t, n), l;
}
function Yl() {
  Cr(), ++Qt;
  for (var e = Vn, t; e; )
    (t = jt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Qt;
}
function Hr() {
  jt = (qn = hn.now()) + Jn, Qt = tn = 0;
  try {
    Yl();
  } finally {
    Qt = 0, Zl(), jt = 0;
  }
}
function Jl() {
  var e = hn.now(), t = e - qn;
  t > Di && (Jn -= t, qn = e);
}
function Zl() {
  for (var e, t = Vn, n, l = 1 / 0; t; )
    t._call ? (l > t._time && (l = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Vn = n);
  nn = e, br(l);
}
function br(e) {
  if (!Qt) {
    tn && (tn = clearTimeout(tn));
    var t = e - jt;
    t > 24 ? (e < 1 / 0 && (tn = setTimeout(Hr, e - hn.now() - Jn)), Ht && (Ht = clearInterval(Ht))) : (Ht || (qn = hn.now(), Ht = setInterval(Jl, Di)), Qt = 1, Gi(Hr));
  }
}
function ei(e, t, n) {
  var l = new Un();
  return t = t == null ? 0 : +t, l.restart((a) => {
    l.stop(), e(a + t);
  }, t, n), l;
}
var Kl = gn("start", "end", "cancel", "interrupt"), Hl = [], Vi = 0, ti = 1, _r = 2, Pn = 3, ni = 4, xr = 5, zn = 6;
function Zn(e, t, n, l, a, h) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (n in c) return;
  ea(e, n, {
    name: t,
    index: l,
    // For context during callback.
    group: a,
    // For context during callback.
    on: Kl,
    tween: Hl,
    time: h.time,
    delay: h.delay,
    duration: h.duration,
    ease: h.ease,
    timer: null,
    state: Vi
  });
}
function Pr(e, t) {
  var n = ht(e, t);
  if (n.state > Vi) throw new Error("too late; already scheduled");
  return n;
}
function wt(e, t) {
  var n = ht(e, t);
  if (n.state > Pn) throw new Error("too late; already running");
  return n;
}
function ht(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function ea(e, t, n) {
  var l = e.__transition, a;
  l[t] = n, n.timer = Ir(h, 0, n.time);
  function h(g) {
    n.state = ti, n.timer.restart(c, n.delay, n.time), n.delay <= g && c(g - n.delay);
  }
  function c(g) {
    var v, m, x, R;
    if (n.state !== ti) return p();
    for (v in l)
      if (R = l[v], R.name === n.name) {
        if (R.state === Pn) return ei(c);
        R.state === ni ? (R.state = zn, R.timer.stop(), R.on.call("interrupt", e, e.__data__, R.index, R.group), delete l[v]) : +v < t && (R.state = zn, R.timer.stop(), R.on.call("cancel", e, e.__data__, R.index, R.group), delete l[v]);
      }
    if (ei(function() {
      n.state === Pn && (n.state = ni, n.timer.restart(f, n.delay, n.time), f(g));
    }), n.state = _r, n.on.call("start", e, e.__data__, n.index, n.group), n.state === _r) {
      for (n.state = Pn, a = new Array(x = n.tween.length), v = 0, m = -1; v < x; ++v)
        (R = n.tween[v].value.call(e, e.__data__, n.index, n.group)) && (a[++m] = R);
      a.length = m + 1;
    }
  }
  function f(g) {
    for (var v = g < n.duration ? n.ease.call(null, g / n.duration) : (n.timer.restart(p), n.state = xr, 1), m = -1, x = a.length; ++m < x; )
      a[m].call(e, v);
    n.state === xr && (n.on.call("end", e, e.__data__, n.index, n.group), p());
  }
  function p() {
    n.state = zn, n.timer.stop(), delete l[t];
    for (var g in l) return;
    delete e.__transition;
  }
}
function $n(e, t) {
  var n = e.__transition, l, a, h = !0, c;
  if (n) {
    t = t == null ? null : t + "";
    for (c in n) {
      if ((l = n[c]).name !== t) {
        h = !1;
        continue;
      }
      a = l.state > _r && l.state < xr, l.state = zn, l.timer.stop(), l.on.call(a ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete n[c];
    }
    h && delete e.__transition;
  }
}
function ta(e) {
  return this.each(function() {
    $n(this, e);
  });
}
function na(e, t) {
  var n, l;
  return function() {
    var a = wt(this, e), h = a.tween;
    if (h !== n) {
      l = n = h;
      for (var c = 0, f = l.length; c < f; ++c)
        if (l[c].name === t) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    a.tween = l;
  };
}
function ra(e, t, n) {
  var l, a;
  if (typeof n != "function") throw new Error();
  return function() {
    var h = wt(this, e), c = h.tween;
    if (c !== l) {
      a = (l = c).slice();
      for (var f = { name: t, value: n }, p = 0, g = a.length; p < g; ++p)
        if (a[p].name === t) {
          a[p] = f;
          break;
        }
      p === g && a.push(f);
    }
    h.tween = a;
  };
}
function ia(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = ht(this.node(), n).tween, a = 0, h = l.length, c; a < h; ++a)
      if ((c = l[a]).name === e)
        return c.value;
    return null;
  }
  return this.each((t == null ? na : ra)(n, e, t));
}
function zr(e, t, n) {
  var l = e._id;
  return e.each(function() {
    var a = wt(this, l);
    (a.value || (a.value = {}))[t] = n.apply(this, arguments);
  }), function(a) {
    return ht(a, l).value[t];
  };
}
function qi(e, t) {
  var n;
  return (typeof t == "number" ? pt : t instanceof Bt ? Gn : (n = Bt(t)) ? (t = n, Gn) : Fi)(e, t);
}
function sa(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function oa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function la(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = this.getAttribute(e);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function aa(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function ua(e, t, n) {
  var l, a, h;
  return function() {
    var c, f = n(this), p;
    return f == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = f + "", c === p ? null : c === l && p === a ? h : (a = p, h = t(l = c, f)));
  };
}
function ha(e, t, n) {
  var l, a, h;
  return function() {
    var c, f = n(this), p;
    return f == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = f + "", c === p ? null : c === l && p === a ? h : (a = p, h = t(l = c, f)));
  };
}
function ca(e, t) {
  var n = Yn(e), l = n === "transform" ? Vl : qi;
  return this.attrTween(e, typeof t == "function" ? (n.local ? ha : ua)(n, l, zr(this, "attr." + e, t)) : t == null ? (n.local ? oa : sa)(n) : (n.local ? aa : la)(n, l, t));
}
function fa(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function da(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ga(e, t) {
  var n, l;
  function a() {
    var h = t.apply(this, arguments);
    return h !== l && (n = (l = h) && da(e, h)), n;
  }
  return a._value = t, a;
}
function pa(e, t) {
  var n, l;
  function a() {
    var h = t.apply(this, arguments);
    return h !== l && (n = (l = h) && fa(e, h)), n;
  }
  return a._value = t, a;
}
function ma(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var l = Yn(e);
  return this.tween(n, (l.local ? ga : pa)(l, t));
}
function wa(e, t) {
  return function() {
    Pr(this, e).delay = +t.apply(this, arguments);
  };
}
function ya(e, t) {
  return t = +t, function() {
    Pr(this, e).delay = t;
  };
}
function va(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? wa : ya)(t, e)) : ht(this.node(), t).delay;
}
function ba(e, t) {
  return function() {
    wt(this, e).duration = +t.apply(this, arguments);
  };
}
function _a(e, t) {
  return t = +t, function() {
    wt(this, e).duration = t;
  };
}
function xa(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ba : _a)(t, e)) : ht(this.node(), t).duration;
}
function Ea(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    wt(this, e).ease = t;
  };
}
function Sa(e) {
  var t = this._id;
  return arguments.length ? this.each(Ea(t, e)) : ht(this.node(), t).ease;
}
function ka(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    wt(this, e).ease = n;
  };
}
function Ma(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ka(this._id, e));
}
function Na(e) {
  typeof e != "function" && (e = xi(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = [], p, g = 0; g < c; ++g)
      (p = h[g]) && e.call(p, p.__data__, g, h) && f.push(p);
  return new xt(l, this._parents, this._name, this._id);
}
function La(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, l = t.length, a = n.length, h = Math.min(l, a), c = new Array(l), f = 0; f < h; ++f)
    for (var p = t[f], g = n[f], v = p.length, m = c[f] = new Array(v), x, R = 0; R < v; ++R)
      (x = p[R] || g[R]) && (m[R] = x);
  for (; f < l; ++f)
    c[f] = t[f];
  return new xt(c, this._parents, this._name, this._id);
}
function Ta(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Ra(e, t, n) {
  var l, a, h = Ta(t) ? Pr : wt;
  return function() {
    var c = h(this, e), f = c.on;
    f !== l && (a = (l = f).copy()).on(t, n), c.on = a;
  };
}
function Ca(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ht(this.node(), n).on.on(e) : this.each(Ra(n, e, t));
}
function Ia(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Pa() {
  return this.on("end.remove", Ia(this._id));
}
function za(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Mr(e));
  for (var l = this._groups, a = l.length, h = new Array(a), c = 0; c < a; ++c)
    for (var f = l[c], p = f.length, g = h[c] = new Array(p), v, m, x = 0; x < p; ++x)
      (v = f[x]) && (m = e.call(v, v.__data__, x, f)) && ("__data__" in v && (m.__data__ = v.__data__), g[x] = m, Zn(g[x], t, n, x, g, ht(v, n)));
  return new xt(h, this._parents, t, n);
}
function $a(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = _i(e));
  for (var l = this._groups, a = l.length, h = [], c = [], f = 0; f < a; ++f)
    for (var p = l[f], g = p.length, v, m = 0; m < g; ++m)
      if (v = p[m]) {
        for (var x = e.call(v, v.__data__, m, p), R, P = ht(v, n), F = 0, A = x.length; F < A; ++F)
          (R = x[F]) && Zn(R, t, n, F, x, P);
        h.push(x), c.push(v);
      }
  return new xt(h, c, t, n);
}
var Oa = pn.prototype.constructor;
function Aa() {
  return new Oa(this._groups, this._parents);
}
function Fa(e, t) {
  var n, l, a;
  return function() {
    var h = Xt(this, e), c = (this.style.removeProperty(e), Xt(this, e));
    return h === c ? null : h === n && c === l ? a : a = t(n = h, l = c);
  };
}
function Ui(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ba(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = Xt(this, e);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function ja(e, t, n) {
  var l, a, h;
  return function() {
    var c = Xt(this, e), f = n(this), p = f + "";
    return f == null && (p = f = (this.style.removeProperty(e), Xt(this, e))), c === p ? null : c === l && p === a ? h : (a = p, h = t(l = c, f));
  };
}
function Da(e, t) {
  var n, l, a, h = "style." + t, c = "end." + h, f;
  return function() {
    var p = wt(this, e), g = p.on, v = p.value[h] == null ? f || (f = Ui(t)) : void 0;
    (g !== n || a !== v) && (l = (n = g).copy()).on(c, a = v), p.on = l;
  };
}
function Ga(e, t, n) {
  var l = (e += "") == "transform" ? Gl : qi;
  return t == null ? this.styleTween(e, Fa(e, l)).on("end.style." + e, Ui(e)) : typeof t == "function" ? this.styleTween(e, ja(e, l, zr(this, "style." + e, t))).each(Da(this._id, e)) : this.styleTween(e, Ba(e, l, t), n).on("end.style." + e, null);
}
function Va(e, t, n) {
  return function(l) {
    this.style.setProperty(e, t.call(this, l), n);
  };
}
function qa(e, t, n) {
  var l, a;
  function h() {
    var c = t.apply(this, arguments);
    return c !== a && (l = (a = c) && Va(e, c, n)), l;
  }
  return h._value = t, h;
}
function Ua(e, t, n) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (t == null) return this.tween(l, null);
  if (typeof t != "function") throw new Error();
  return this.tween(l, qa(e, t, n ?? ""));
}
function Wa(e) {
  return function() {
    this.textContent = e;
  };
}
function Xa(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Qa(e) {
  return this.tween("text", typeof e == "function" ? Xa(zr(this, "text", e)) : Wa(e == null ? "" : e + ""));
}
function Ya(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ja(e) {
  var t, n;
  function l() {
    var a = e.apply(this, arguments);
    return a !== n && (t = (n = a) && Ya(a)), t;
  }
  return l._value = e, l;
}
function Za(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ja(e));
}
function Ka() {
  for (var e = this._name, t = this._id, n = Wi(), l = this._groups, a = l.length, h = 0; h < a; ++h)
    for (var c = l[h], f = c.length, p, g = 0; g < f; ++g)
      if (p = c[g]) {
        var v = ht(p, t);
        Zn(p, e, n, g, c, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease
        });
      }
  return new xt(l, this._parents, e, n);
}
function Ha() {
  var e, t, n = this, l = n._id, a = n.size();
  return new Promise(function(h, c) {
    var f = { value: c }, p = { value: function() {
      --a === 0 && h();
    } };
    n.each(function() {
      var g = wt(this, l), v = g.on;
      v !== e && (t = (e = v).copy(), t._.cancel.push(f), t._.interrupt.push(f), t._.end.push(p)), g.on = t;
    }), a === 0 && h();
  });
}
var eu = 0;
function xt(e, t, n, l) {
  this._groups = e, this._parents = t, this._name = n, this._id = l;
}
function Wi() {
  return ++eu;
}
var bt = pn.prototype;
xt.prototype = {
  constructor: xt,
  select: za,
  selectAll: $a,
  selectChild: bt.selectChild,
  selectChildren: bt.selectChildren,
  filter: Na,
  merge: La,
  selection: Aa,
  transition: Ka,
  call: bt.call,
  nodes: bt.nodes,
  node: bt.node,
  size: bt.size,
  empty: bt.empty,
  each: bt.each,
  on: Ca,
  attr: ca,
  attrTween: ma,
  style: Ga,
  styleTween: Ua,
  text: Qa,
  textTween: Za,
  remove: Pa,
  tween: ia,
  delay: va,
  duration: xa,
  ease: Sa,
  easeVarying: Ma,
  end: Ha,
  [Symbol.iterator]: bt[Symbol.iterator]
};
const ri = (e) => +e;
function tu(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var nu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: tu
};
function ru(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function iu(e) {
  var t, n;
  e instanceof xt ? (t = e._id, e = e._name) : (t = Wi(), (n = nu).time = Cr(), e = e == null ? null : e + "");
  for (var l = this._groups, a = l.length, h = 0; h < a; ++h)
    for (var c = l[h], f = c.length, p, g = 0; g < f; ++g)
      (p = c[g]) && Zn(p, e, t, g, c, n || ru(p, t));
  return new xt(l, this._parents, e, t);
}
pn.prototype.interrupt = ta;
pn.prototype.transition = iu;
const Er = Math.PI, Sr = 2 * Er, Ot = 1e-6, su = Sr - Ot;
function Xi(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function ou(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Xi;
  const n = 10 ** t;
  return function(l) {
    this._ += l[0];
    for (let a = 1, h = l.length; a < h; ++a)
      this._ += Math.round(arguments[a] * n) / n + l[a];
  };
}
class lu {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Xi : ou(t);
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
  quadraticCurveTo(t, n, l, a) {
    this._append`Q${+t},${+n},${this._x1 = +l},${this._y1 = +a}`;
  }
  bezierCurveTo(t, n, l, a, h, c) {
    this._append`C${+t},${+n},${+l},${+a},${this._x1 = +h},${this._y1 = +c}`;
  }
  arcTo(t, n, l, a, h) {
    if (t = +t, n = +n, l = +l, a = +a, h = +h, h < 0) throw new Error(`negative radius: ${h}`);
    let c = this._x1, f = this._y1, p = l - t, g = a - n, v = c - t, m = f - n, x = v * v + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (x > Ot) if (!(Math.abs(m * p - g * v) > Ot) || !h)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let R = l - c, P = a - f, F = p * p + g * g, A = R * R + P * P, M = Math.sqrt(F), D = Math.sqrt(x), q = h * Math.tan((Er - Math.acos((F + x - A) / (2 * M * D))) / 2), I = q / D, V = q / M;
      Math.abs(I - 1) > Ot && this._append`L${t + I * v},${n + I * m}`, this._append`A${h},${h},0,0,${+(m * R > v * P)},${this._x1 = t + V * p},${this._y1 = n + V * g}`;
    }
  }
  arc(t, n, l, a, h, c) {
    if (t = +t, n = +n, l = +l, c = !!c, l < 0) throw new Error(`negative radius: ${l}`);
    let f = l * Math.cos(a), p = l * Math.sin(a), g = t + f, v = n + p, m = 1 ^ c, x = c ? a - h : h - a;
    this._x1 === null ? this._append`M${g},${v}` : (Math.abs(this._x1 - g) > Ot || Math.abs(this._y1 - v) > Ot) && this._append`L${g},${v}`, l && (x < 0 && (x = x % Sr + Sr), x > su ? this._append`A${l},${l},0,1,${m},${t - f},${n - p}A${l},${l},0,1,${m},${this._x1 = g},${this._y1 = v}` : x > Ot && this._append`A${l},${l},0,${+(x >= Er)},${m},${this._x1 = t + l * Math.cos(h)},${this._y1 = n + l * Math.sin(h)}`);
  }
  rect(t, n, l, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${l = +l}v${+a}h${-l}Z`;
  }
  toString() {
    return this._;
  }
}
function au(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Qi(this.cover(t, n), t, n, e);
}
function Qi(e, t, n, l) {
  if (isNaN(t) || isNaN(n)) return e;
  var a, h = e._root, c = { data: l }, f = e._x0, p = e._y0, g = e._x1, v = e._y1, m, x, R, P, F, A, M, D;
  if (!h) return e._root = c, e;
  for (; h.length; )
    if ((F = t >= (m = (f + g) / 2)) ? f = m : g = m, (A = n >= (x = (p + v) / 2)) ? p = x : v = x, a = h, !(h = h[M = A << 1 | F])) return a[M] = c, e;
  if (R = +e._x.call(null, h.data), P = +e._y.call(null, h.data), t === R && n === P) return c.next = h, a ? a[M] = c : e._root = c, e;
  do
    a = a ? a[M] = new Array(4) : e._root = new Array(4), (F = t >= (m = (f + g) / 2)) ? f = m : g = m, (A = n >= (x = (p + v) / 2)) ? p = x : v = x;
  while ((M = A << 1 | F) === (D = (P >= x) << 1 | R >= m));
  return a[D] = h, a[M] = c, e;
}
function uu(e) {
  var t, n, l = e.length, a, h, c = new Array(l), f = new Array(l), p = 1 / 0, g = 1 / 0, v = -1 / 0, m = -1 / 0;
  for (n = 0; n < l; ++n)
    isNaN(a = +this._x.call(null, t = e[n])) || isNaN(h = +this._y.call(null, t)) || (c[n] = a, f[n] = h, a < p && (p = a), a > v && (v = a), h < g && (g = h), h > m && (m = h));
  if (p > v || g > m) return this;
  for (this.cover(p, g).cover(v, m), n = 0; n < l; ++n)
    Qi(this, c[n], f[n], e[n]);
  return this;
}
function hu(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, l = this._y0, a = this._x1, h = this._y1;
  if (isNaN(n))
    a = (n = Math.floor(e)) + 1, h = (l = Math.floor(t)) + 1;
  else {
    for (var c = a - n || 1, f = this._root, p, g; n > e || e >= a || l > t || t >= h; )
      switch (g = (t < l) << 1 | e < n, p = new Array(4), p[g] = f, f = p, c *= 2, g) {
        case 0:
          a = n + c, h = l + c;
          break;
        case 1:
          n = a - c, h = l + c;
          break;
        case 2:
          a = n + c, l = h - c;
          break;
        case 3:
          n = a - c, l = h - c;
          break;
      }
    this._root && this._root.length && (this._root = f);
  }
  return this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this;
}
function cu() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function fu(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function qe(e, t, n, l, a) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = l, this.y1 = a;
}
function du(e, t, n) {
  var l, a = this._x0, h = this._y0, c, f, p, g, v = this._x1, m = this._y1, x = [], R = this._root, P, F;
  for (R && x.push(new qe(R, a, h, v, m)), n == null ? n = 1 / 0 : (a = e - n, h = t - n, v = e + n, m = t + n, n *= n); P = x.pop(); )
    if (!(!(R = P.node) || (c = P.x0) > v || (f = P.y0) > m || (p = P.x1) < a || (g = P.y1) < h))
      if (R.length) {
        var A = (c + p) / 2, M = (f + g) / 2;
        x.push(
          new qe(R[3], A, M, p, g),
          new qe(R[2], c, M, A, g),
          new qe(R[1], A, f, p, M),
          new qe(R[0], c, f, A, M)
        ), (F = (t >= M) << 1 | e >= A) && (P = x[x.length - 1], x[x.length - 1] = x[x.length - 1 - F], x[x.length - 1 - F] = P);
      } else {
        var D = e - +this._x.call(null, R.data), q = t - +this._y.call(null, R.data), I = D * D + q * q;
        if (I < n) {
          var V = Math.sqrt(n = I);
          a = e - V, h = t - V, v = e + V, m = t + V, l = R.data;
        }
      }
  return l;
}
function gu(e) {
  if (isNaN(v = +this._x.call(null, e)) || isNaN(m = +this._y.call(null, e))) return this;
  var t, n = this._root, l, a, h, c = this._x0, f = this._y0, p = this._x1, g = this._y1, v, m, x, R, P, F, A, M;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((P = v >= (x = (c + p) / 2)) ? c = x : p = x, (F = m >= (R = (f + g) / 2)) ? f = R : g = R, t = n, !(n = n[A = F << 1 | P])) return this;
    if (!n.length) break;
    (t[A + 1 & 3] || t[A + 2 & 3] || t[A + 3 & 3]) && (l = t, M = A);
  }
  for (; n.data !== e; ) if (a = n, !(n = n.next)) return this;
  return (h = n.next) && delete n.next, a ? (h ? a.next = h : delete a.next, this) : t ? (h ? t[A] = h : delete t[A], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (l ? l[M] = n : this._root = n), this) : (this._root = h, this);
}
function pu(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function mu() {
  return this._root;
}
function wu() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function yu(e) {
  var t = [], n, l = this._root, a, h, c, f, p;
  for (l && t.push(new qe(l, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(l = n.node, h = n.x0, c = n.y0, f = n.x1, p = n.y1) && l.length) {
      var g = (h + f) / 2, v = (c + p) / 2;
      (a = l[3]) && t.push(new qe(a, g, v, f, p)), (a = l[2]) && t.push(new qe(a, h, v, g, p)), (a = l[1]) && t.push(new qe(a, g, c, f, v)), (a = l[0]) && t.push(new qe(a, h, c, g, v));
    }
  return this;
}
function vu(e) {
  var t = [], n = [], l;
  for (this._root && t.push(new qe(this._root, this._x0, this._y0, this._x1, this._y1)); l = t.pop(); ) {
    var a = l.node;
    if (a.length) {
      var h, c = l.x0, f = l.y0, p = l.x1, g = l.y1, v = (c + p) / 2, m = (f + g) / 2;
      (h = a[0]) && t.push(new qe(h, c, f, v, m)), (h = a[1]) && t.push(new qe(h, v, f, p, m)), (h = a[2]) && t.push(new qe(h, c, m, v, g)), (h = a[3]) && t.push(new qe(h, v, m, p, g));
    }
    n.push(l);
  }
  for (; l = n.pop(); )
    e(l.node, l.x0, l.y0, l.x1, l.y1);
  return this;
}
function bu(e) {
  return e[0];
}
function _u(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function xu(e) {
  return e[1];
}
function Eu(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function $r(e, t, n) {
  var l = new Or(t ?? bu, n ?? xu, NaN, NaN, NaN, NaN);
  return e == null ? l : l.addAll(e);
}
function Or(e, t, n, l, a, h) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this._root = void 0;
}
function ii(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Xe = $r.prototype = Or.prototype;
Xe.copy = function() {
  var e = new Or(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, l;
  if (!t) return e;
  if (!t.length) return e._root = ii(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var a = 0; a < 4; ++a)
      (l = t.source[a]) && (l.length ? n.push({ source: l, target: t.target[a] = new Array(4) }) : t.target[a] = ii(l));
  return e;
};
Xe.add = au;
Xe.addAll = uu;
Xe.cover = hu;
Xe.data = cu;
Xe.extent = fu;
Xe.find = du;
Xe.remove = gu;
Xe.removeAll = pu;
Xe.root = mu;
Xe.size = wu;
Xe.visit = yu;
Xe.visitAfter = vu;
Xe.x = _u;
Xe.y = Eu;
function We(e) {
  return function() {
    return e;
  };
}
function Lt(e) {
  return (e() - 0.5) * 1e-6;
}
function Su(e) {
  return e.x + e.vx;
}
function ku(e) {
  return e.y + e.vy;
}
function Mu(e) {
  var t, n, l, a = 1, h = 1;
  typeof e != "function" && (e = We(e == null ? 1 : +e));
  function c() {
    for (var g, v = t.length, m, x, R, P, F, A, M = 0; M < h; ++M)
      for (m = $r(t, Su, ku).visitAfter(f), g = 0; g < v; ++g)
        x = t[g], F = n[x.index], A = F * F, R = x.x + x.vx, P = x.y + x.vy, m.visit(D);
    function D(q, I, V, K, ee) {
      var le = q.data, de = q.r, H = F + de;
      if (le) {
        if (le.index > x.index) {
          var ce = R - le.x - le.vx, ve = P - le.y - le.vy, re = ce * ce + ve * ve;
          re < H * H && (ce === 0 && (ce = Lt(l), re += ce * ce), ve === 0 && (ve = Lt(l), re += ve * ve), re = (H - (re = Math.sqrt(re))) / re * a, x.vx += (ce *= re) * (H = (de *= de) / (A + de)), x.vy += (ve *= re) * H, le.vx -= ce * (H = 1 - H), le.vy -= ve * H);
        }
        return;
      }
      return I > R + H || K < R - H || V > P + H || ee < P - H;
    }
  }
  function f(g) {
    if (g.data) return g.r = n[g.data.index];
    for (var v = g.r = 0; v < 4; ++v)
      g[v] && g[v].r > g.r && (g.r = g[v].r);
  }
  function p() {
    if (t) {
      var g, v = t.length, m;
      for (n = new Array(v), g = 0; g < v; ++g) m = t[g], n[m.index] = +e(m, g, t);
    }
  }
  return c.initialize = function(g, v) {
    t = g, l = v, p();
  }, c.iterations = function(g) {
    return arguments.length ? (h = +g, c) : h;
  }, c.strength = function(g) {
    return arguments.length ? (a = +g, c) : a;
  }, c.radius = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : We(+g), p(), c) : e;
  }, c;
}
function Nu(e) {
  return e.index;
}
function si(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Lu(e) {
  var t = Nu, n = m, l, a = We(30), h, c, f, p, g, v = 1;
  e == null && (e = []);
  function m(A) {
    return 1 / Math.min(f[A.source.index], f[A.target.index]);
  }
  function x(A) {
    for (var M = 0, D = e.length; M < v; ++M)
      for (var q = 0, I, V, K, ee, le, de, H; q < D; ++q)
        I = e[q], V = I.source, K = I.target, ee = K.x + K.vx - V.x - V.vx || Lt(g), le = K.y + K.vy - V.y - V.vy || Lt(g), de = Math.sqrt(ee * ee + le * le), de = (de - h[q]) / de * A * l[q], ee *= de, le *= de, K.vx -= ee * (H = p[q]), K.vy -= le * H, V.vx += ee * (H = 1 - H), V.vy += le * H;
  }
  function R() {
    if (c) {
      var A, M = c.length, D = e.length, q = new Map(c.map((V, K) => [t(V, K, c), V])), I;
      for (A = 0, f = new Array(M); A < D; ++A)
        I = e[A], I.index = A, typeof I.source != "object" && (I.source = si(q, I.source)), typeof I.target != "object" && (I.target = si(q, I.target)), f[I.source.index] = (f[I.source.index] || 0) + 1, f[I.target.index] = (f[I.target.index] || 0) + 1;
      for (A = 0, p = new Array(D); A < D; ++A)
        I = e[A], p[A] = f[I.source.index] / (f[I.source.index] + f[I.target.index]);
      l = new Array(D), P(), h = new Array(D), F();
    }
  }
  function P() {
    if (c)
      for (var A = 0, M = e.length; A < M; ++A)
        l[A] = +n(e[A], A, e);
  }
  function F() {
    if (c)
      for (var A = 0, M = e.length; A < M; ++A)
        h[A] = +a(e[A], A, e);
  }
  return x.initialize = function(A, M) {
    c = A, g = M, R();
  }, x.links = function(A) {
    return arguments.length ? (e = A, R(), x) : e;
  }, x.id = function(A) {
    return arguments.length ? (t = A, x) : t;
  }, x.iterations = function(A) {
    return arguments.length ? (v = +A, x) : v;
  }, x.strength = function(A) {
    return arguments.length ? (n = typeof A == "function" ? A : We(+A), P(), x) : n;
  }, x.distance = function(A) {
    return arguments.length ? (a = typeof A == "function" ? A : We(+A), F(), x) : a;
  }, x;
}
const Tu = 1664525, Ru = 1013904223, oi = 4294967296;
function Cu() {
  let e = 1;
  return () => (e = (Tu * e + Ru) % oi) / oi;
}
function Iu(e) {
  return e.x;
}
function Pu(e) {
  return e.y;
}
var zu = 10, $u = Math.PI * (3 - Math.sqrt(5));
function Ou(e) {
  var t, n = 1, l = 1e-3, a = 1 - Math.pow(l, 1 / 300), h = 0, c = 0.6, f = /* @__PURE__ */ new Map(), p = Ir(m), g = gn("tick", "end"), v = Cu();
  e == null && (e = []);
  function m() {
    x(), g.call("tick", t), n < l && (p.stop(), g.call("end", t));
  }
  function x(F) {
    var A, M = e.length, D;
    F === void 0 && (F = 1);
    for (var q = 0; q < F; ++q)
      for (n += (h - n) * a, f.forEach(function(I) {
        I(n);
      }), A = 0; A < M; ++A)
        D = e[A], D.fx == null ? D.x += D.vx *= c : (D.x = D.fx, D.vx = 0), D.fy == null ? D.y += D.vy *= c : (D.y = D.fy, D.vy = 0);
    return t;
  }
  function R() {
    for (var F = 0, A = e.length, M; F < A; ++F) {
      if (M = e[F], M.index = F, M.fx != null && (M.x = M.fx), M.fy != null && (M.y = M.fy), isNaN(M.x) || isNaN(M.y)) {
        var D = zu * Math.sqrt(0.5 + F), q = F * $u;
        M.x = D * Math.cos(q), M.y = D * Math.sin(q);
      }
      (isNaN(M.vx) || isNaN(M.vy)) && (M.vx = M.vy = 0);
    }
  }
  function P(F) {
    return F.initialize && F.initialize(e, v), F;
  }
  return R(), t = {
    tick: x,
    restart: function() {
      return p.restart(m), t;
    },
    stop: function() {
      return p.stop(), t;
    },
    nodes: function(F) {
      return arguments.length ? (e = F, R(), f.forEach(P), t) : e;
    },
    alpha: function(F) {
      return arguments.length ? (n = +F, t) : n;
    },
    alphaMin: function(F) {
      return arguments.length ? (l = +F, t) : l;
    },
    alphaDecay: function(F) {
      return arguments.length ? (a = +F, t) : +a;
    },
    alphaTarget: function(F) {
      return arguments.length ? (h = +F, t) : h;
    },
    velocityDecay: function(F) {
      return arguments.length ? (c = 1 - F, t) : 1 - c;
    },
    randomSource: function(F) {
      return arguments.length ? (v = F, f.forEach(P), t) : v;
    },
    force: function(F, A) {
      return arguments.length > 1 ? (A == null ? f.delete(F) : f.set(F, P(A)), t) : f.get(F);
    },
    find: function(F, A, M) {
      var D = 0, q = e.length, I, V, K, ee, le;
      for (M == null ? M = 1 / 0 : M *= M, D = 0; D < q; ++D)
        ee = e[D], I = F - ee.x, V = A - ee.y, K = I * I + V * V, K < M && (le = ee, M = K);
      return le;
    },
    on: function(F, A) {
      return arguments.length > 1 ? (g.on(F, A), t) : g.on(F);
    }
  };
}
function Au() {
  var e, t, n, l, a = We(-30), h, c = 1, f = 1 / 0, p = 0.81;
  function g(R) {
    var P, F = e.length, A = $r(e, Iu, Pu).visitAfter(m);
    for (l = R, P = 0; P < F; ++P) t = e[P], A.visit(x);
  }
  function v() {
    if (e) {
      var R, P = e.length, F;
      for (h = new Array(P), R = 0; R < P; ++R) F = e[R], h[F.index] = +a(F, R, e);
    }
  }
  function m(R) {
    var P = 0, F, A, M = 0, D, q, I;
    if (R.length) {
      for (D = q = I = 0; I < 4; ++I)
        (F = R[I]) && (A = Math.abs(F.value)) && (P += F.value, M += A, D += A * F.x, q += A * F.y);
      R.x = D / M, R.y = q / M;
    } else {
      F = R, F.x = F.data.x, F.y = F.data.y;
      do
        P += h[F.data.index];
      while (F = F.next);
    }
    R.value = P;
  }
  function x(R, P, F, A) {
    if (!R.value) return !0;
    var M = R.x - t.x, D = R.y - t.y, q = A - P, I = M * M + D * D;
    if (q * q / p < I)
      return I < f && (M === 0 && (M = Lt(n), I += M * M), D === 0 && (D = Lt(n), I += D * D), I < c && (I = Math.sqrt(c * I)), t.vx += M * R.value * l / I, t.vy += D * R.value * l / I), !0;
    if (R.length || I >= f) return;
    (R.data !== t || R.next) && (M === 0 && (M = Lt(n), I += M * M), D === 0 && (D = Lt(n), I += D * D), I < c && (I = Math.sqrt(c * I)));
    do
      R.data !== t && (q = h[R.data.index] * l / I, t.vx += M * q, t.vy += D * q);
    while (R = R.next);
  }
  return g.initialize = function(R, P) {
    e = R, n = P, v();
  }, g.strength = function(R) {
    return arguments.length ? (a = typeof R == "function" ? R : We(+R), v(), g) : a;
  }, g.distanceMin = function(R) {
    return arguments.length ? (c = R * R, g) : Math.sqrt(c);
  }, g.distanceMax = function(R) {
    return arguments.length ? (f = R * R, g) : Math.sqrt(f);
  }, g.theta = function(R) {
    return arguments.length ? (p = R * R, g) : Math.sqrt(p);
  }, g;
}
function Fu(e) {
  var t = We(0.1), n, l, a;
  typeof e != "function" && (e = We(e == null ? 0 : +e));
  function h(f) {
    for (var p = 0, g = n.length, v; p < g; ++p)
      v = n[p], v.vx += (a[p] - v.x) * l[p] * f;
  }
  function c() {
    if (n) {
      var f, p = n.length;
      for (l = new Array(p), a = new Array(p), f = 0; f < p; ++f)
        l[f] = isNaN(a[f] = +e(n[f], f, n)) ? 0 : +t(n[f], f, n);
    }
  }
  return h.initialize = function(f) {
    n = f, c();
  }, h.strength = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : We(+f), c(), h) : t;
  }, h.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : We(+f), c(), h) : e;
  }, h;
}
function Bu(e) {
  var t = We(0.1), n, l, a;
  typeof e != "function" && (e = We(e == null ? 0 : +e));
  function h(f) {
    for (var p = 0, g = n.length, v; p < g; ++p)
      v = n[p], v.vy += (a[p] - v.y) * l[p] * f;
  }
  function c() {
    if (n) {
      var f, p = n.length;
      for (l = new Array(p), a = new Array(p), f = 0; f < p; ++f)
        l[f] = isNaN(a[f] = +e(n[f], f, n)) ? 0 : +t(n[f], f, n);
    }
  }
  return h.initialize = function(f) {
    n = f, c();
  }, h.strength = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : We(+f), c(), h) : t;
  }, h.y = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : We(+f), c(), h) : e;
  }, h;
}
function Je(e) {
  return function() {
    return e;
  };
}
const li = Math.abs, je = Math.atan2, zt = Math.cos, ju = Math.max, hr = Math.min, gt = Math.sin, Gt = Math.sqrt, Ye = 1e-12, cn = Math.PI, Wn = cn / 2, Du = 2 * cn;
function Gu(e) {
  return e > 1 ? 0 : e < -1 ? cn : Math.acos(e);
}
function ai(e) {
  return e >= 1 ? Wn : e <= -1 ? -Wn : Math.asin(e);
}
function Yi(e) {
  let t = 3;
  return e.digits = function(n) {
    if (!arguments.length) return t;
    if (n == null)
      t = null;
    else {
      const l = Math.floor(n);
      if (!(l >= 0)) throw new RangeError(`invalid digits: ${n}`);
      t = l;
    }
    return e;
  }, () => new lu(t);
}
function Vu(e) {
  return e.innerRadius;
}
function qu(e) {
  return e.outerRadius;
}
function Uu(e) {
  return e.startAngle;
}
function Wu(e) {
  return e.endAngle;
}
function Xu(e) {
  return e && e.padAngle;
}
function Qu(e, t, n, l, a, h, c, f) {
  var p = n - e, g = l - t, v = c - a, m = f - h, x = m * p - v * g;
  if (!(x * x < Ye))
    return x = (v * (t - h) - m * (e - a)) / x, [e + x * p, t + x * g];
}
function Nn(e, t, n, l, a, h, c) {
  var f = e - n, p = t - l, g = (c ? h : -h) / Gt(f * f + p * p), v = g * p, m = -g * f, x = e + v, R = t + m, P = n + v, F = l + m, A = (x + P) / 2, M = (R + F) / 2, D = P - x, q = F - R, I = D * D + q * q, V = a - h, K = x * F - P * R, ee = (q < 0 ? -1 : 1) * Gt(ju(0, V * V * I - K * K)), le = (K * q - D * ee) / I, de = (-K * D - q * ee) / I, H = (K * q + D * ee) / I, ce = (-K * D + q * ee) / I, ve = le - A, re = de - M, z = H - A, Z = ce - M;
  return ve * ve + re * re > z * z + Z * Z && (le = H, de = ce), {
    cx: le,
    cy: de,
    x01: -v,
    y01: -m,
    x11: le * (a / V - 1),
    y11: de * (a / V - 1)
  };
}
function Yu() {
  var e = Vu, t = qu, n = Je(0), l = null, a = Uu, h = Wu, c = Xu, f = null, p = Yi(g);
  function g() {
    var v, m, x = +e.apply(this, arguments), R = +t.apply(this, arguments), P = a.apply(this, arguments) - Wn, F = h.apply(this, arguments) - Wn, A = li(F - P), M = F > P;
    if (f || (f = v = p()), R < x && (m = R, R = x, x = m), !(R > Ye)) f.moveTo(0, 0);
    else if (A > Du - Ye)
      f.moveTo(R * zt(P), R * gt(P)), f.arc(0, 0, R, P, F, !M), x > Ye && (f.moveTo(x * zt(F), x * gt(F)), f.arc(0, 0, x, F, P, M));
    else {
      var D = P, q = F, I = P, V = F, K = A, ee = A, le = c.apply(this, arguments) / 2, de = le > Ye && (l ? +l.apply(this, arguments) : Gt(x * x + R * R)), H = hr(li(R - x) / 2, +n.apply(this, arguments)), ce = H, ve = H, re, z;
      if (de > Ye) {
        var Z = ai(de / x * gt(le)), W = ai(de / R * gt(le));
        (K -= Z * 2) > Ye ? (Z *= M ? 1 : -1, I += Z, V -= Z) : (K = 0, I = V = (P + F) / 2), (ee -= W * 2) > Ye ? (W *= M ? 1 : -1, D += W, q -= W) : (ee = 0, D = q = (P + F) / 2);
      }
      var ie = R * zt(D), oe = R * gt(D), he = x * zt(V), fe = x * gt(V);
      if (H > Ye) {
        var we = R * zt(q), ne = R * gt(q), Ce = x * zt(I), ke = x * gt(I), Q;
        if (A < cn)
          if (Q = Qu(ie, oe, Ce, ke, we, ne, he, fe)) {
            var Ne = ie - Q[0], Re = oe - Q[1], Ee = we - Q[0], Be = ne - Q[1], yt = 1 / gt(Gu((Ne * Ee + Re * Be) / (Gt(Ne * Ne + Re * Re) * Gt(Ee * Ee + Be * Be))) / 2), ct = Gt(Q[0] * Q[0] + Q[1] * Q[1]);
            ce = hr(H, (x - ct) / (yt - 1)), ve = hr(H, (R - ct) / (yt + 1));
          } else
            ce = ve = 0;
      }
      ee > Ye ? ve > Ye ? (re = Nn(Ce, ke, ie, oe, R, ve, M), z = Nn(we, ne, he, fe, R, ve, M), f.moveTo(re.cx + re.x01, re.cy + re.y01), ve < H ? f.arc(re.cx, re.cy, ve, je(re.y01, re.x01), je(z.y01, z.x01), !M) : (f.arc(re.cx, re.cy, ve, je(re.y01, re.x01), je(re.y11, re.x11), !M), f.arc(0, 0, R, je(re.cy + re.y11, re.cx + re.x11), je(z.cy + z.y11, z.cx + z.x11), !M), f.arc(z.cx, z.cy, ve, je(z.y11, z.x11), je(z.y01, z.x01), !M))) : (f.moveTo(ie, oe), f.arc(0, 0, R, D, q, !M)) : f.moveTo(ie, oe), !(x > Ye) || !(K > Ye) ? f.lineTo(he, fe) : ce > Ye ? (re = Nn(he, fe, we, ne, x, -ce, M), z = Nn(ie, oe, Ce, ke, x, -ce, M), f.lineTo(re.cx + re.x01, re.cy + re.y01), ce < H ? f.arc(re.cx, re.cy, ce, je(re.y01, re.x01), je(z.y01, z.x01), !M) : (f.arc(re.cx, re.cy, ce, je(re.y01, re.x01), je(re.y11, re.x11), !M), f.arc(0, 0, x, je(re.cy + re.y11, re.cx + re.x11), je(z.cy + z.y11, z.cx + z.x11), M), f.arc(z.cx, z.cy, ce, je(z.y11, z.x11), je(z.y01, z.x01), !M))) : f.arc(0, 0, x, V, I, M);
    }
    if (f.closePath(), v) return f = null, v + "" || null;
  }
  return g.centroid = function() {
    var v = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, m = (+a.apply(this, arguments) + +h.apply(this, arguments)) / 2 - cn / 2;
    return [zt(m) * v, gt(m) * v];
  }, g.innerRadius = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : Je(+v), g) : e;
  }, g.outerRadius = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : Je(+v), g) : t;
  }, g.cornerRadius = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : Je(+v), g) : n;
  }, g.padRadius = function(v) {
    return arguments.length ? (l = v == null ? null : typeof v == "function" ? v : Je(+v), g) : l;
  }, g.startAngle = function(v) {
    return arguments.length ? (a = typeof v == "function" ? v : Je(+v), g) : a;
  }, g.endAngle = function(v) {
    return arguments.length ? (h = typeof v == "function" ? v : Je(+v), g) : h;
  }, g.padAngle = function(v) {
    return arguments.length ? (c = typeof v == "function" ? v : Je(+v), g) : c;
  }, g.context = function(v) {
    return arguments.length ? (f = v ?? null, g) : f;
  }, g;
}
function Ju(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ji(e) {
  this._context = e;
}
Ji.prototype = {
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
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function Zu(e) {
  return new Ji(e);
}
function Ku(e) {
  return e[0];
}
function Hu(e) {
  return e[1];
}
function eh(e, t) {
  var n = Je(!0), l = null, a = Zu, h = null, c = Yi(f);
  e = typeof e == "function" ? e : e === void 0 ? Ku : Je(e), t = typeof t == "function" ? t : t === void 0 ? Hu : Je(t);
  function f(p) {
    var g, v = (p = Ju(p)).length, m, x = !1, R;
    for (l == null && (h = a(R = c())), g = 0; g <= v; ++g)
      !(g < v && n(m = p[g], g, p)) === x && ((x = !x) ? h.lineStart() : h.lineEnd()), x && h.point(+e(m, g, p), +t(m, g, p));
    if (R) return h = null, R + "" || null;
  }
  return f.x = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Je(+p), f) : e;
  }, f.y = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Je(+p), f) : t;
  }, f.defined = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Je(!!p), f) : n;
  }, f.curve = function(p) {
    return arguments.length ? (a = p, l != null && (h = a(l)), f) : a;
  }, f.context = function(p) {
    return arguments.length ? (p == null ? l = h = null : h = a(l = p), f) : l;
  }, f;
}
const Ln = (e) => () => e;
function th(e, {
  sourceEvent: t,
  target: n,
  transform: l,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: a }
  });
}
function _t(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
_t.prototype = {
  constructor: _t,
  scale: function(e) {
    return e === 1 ? this : new _t(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new _t(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Zi = new _t(1, 0, 0);
_t.prototype;
function cr(e) {
  e.stopImmediatePropagation();
}
function en(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function nh(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function rh() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ui() {
  return this.__zoom || Zi;
}
function ih(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function sh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function oh(e, t, n) {
  var l = e.invertX(t[0][0]) - n[0][0], a = e.invertX(t[1][0]) - n[1][0], h = e.invertY(t[0][1]) - n[0][1], c = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    a > l ? (l + a) / 2 : Math.min(0, l) || Math.max(0, a),
    c > h ? (h + c) / 2 : Math.min(0, h) || Math.max(0, c)
  );
}
function lh() {
  var e = nh, t = rh, n = oh, l = ih, a = sh, h = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], f = 250, p = Xl, g = gn("start", "zoom", "end"), v, m, x, R = 500, P = 150, F = 0, A = 10;
  function M(z) {
    z.property("__zoom", ui).on("wheel.zoom", le, { passive: !1 }).on("mousedown.zoom", de).on("dblclick.zoom", H).filter(a).on("touchstart.zoom", ce).on("touchmove.zoom", ve).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(z, Z, W, ie) {
    var oe = z.selection ? z.selection() : z;
    oe.property("__zoom", ui), z !== oe ? V(z, Z, W, ie) : oe.interrupt().each(function() {
      K(this, arguments).event(ie).start().zoom(null, typeof Z == "function" ? Z.apply(this, arguments) : Z).end();
    });
  }, M.scaleBy = function(z, Z, W, ie) {
    M.scaleTo(z, function() {
      var oe = this.__zoom.k, he = typeof Z == "function" ? Z.apply(this, arguments) : Z;
      return oe * he;
    }, W, ie);
  }, M.scaleTo = function(z, Z, W, ie) {
    M.transform(z, function() {
      var oe = t.apply(this, arguments), he = this.__zoom, fe = W == null ? I(oe) : typeof W == "function" ? W.apply(this, arguments) : W, we = he.invert(fe), ne = typeof Z == "function" ? Z.apply(this, arguments) : Z;
      return n(q(D(he, ne), fe, we), oe, c);
    }, W, ie);
  }, M.translateBy = function(z, Z, W, ie) {
    M.transform(z, function() {
      return n(this.__zoom.translate(
        typeof Z == "function" ? Z.apply(this, arguments) : Z,
        typeof W == "function" ? W.apply(this, arguments) : W
      ), t.apply(this, arguments), c);
    }, null, ie);
  }, M.translateTo = function(z, Z, W, ie, oe) {
    M.transform(z, function() {
      var he = t.apply(this, arguments), fe = this.__zoom, we = ie == null ? I(he) : typeof ie == "function" ? ie.apply(this, arguments) : ie;
      return n(Zi.translate(we[0], we[1]).scale(fe.k).translate(
        typeof Z == "function" ? -Z.apply(this, arguments) : -Z,
        typeof W == "function" ? -W.apply(this, arguments) : -W
      ), he, c);
    }, ie, oe);
  };
  function D(z, Z) {
    return Z = Math.max(h[0], Math.min(h[1], Z)), Z === z.k ? z : new _t(Z, z.x, z.y);
  }
  function q(z, Z, W) {
    var ie = Z[0] - W[0] * z.k, oe = Z[1] - W[1] * z.k;
    return ie === z.x && oe === z.y ? z : new _t(z.k, ie, oe);
  }
  function I(z) {
    return [(+z[0][0] + +z[1][0]) / 2, (+z[0][1] + +z[1][1]) / 2];
  }
  function V(z, Z, W, ie) {
    z.on("start.zoom", function() {
      K(this, arguments).event(ie).start();
    }).on("interrupt.zoom end.zoom", function() {
      K(this, arguments).event(ie).end();
    }).tween("zoom", function() {
      var oe = this, he = arguments, fe = K(oe, he).event(ie), we = t.apply(oe, he), ne = W == null ? I(we) : typeof W == "function" ? W.apply(oe, he) : W, Ce = Math.max(we[1][0] - we[0][0], we[1][1] - we[0][1]), ke = oe.__zoom, Q = typeof Z == "function" ? Z.apply(oe, he) : Z, Ne = p(ke.invert(ne).concat(Ce / ke.k), Q.invert(ne).concat(Ce / Q.k));
      return function(Re) {
        if (Re === 1) Re = Q;
        else {
          var Ee = Ne(Re), Be = Ce / Ee[2];
          Re = new _t(Be, ne[0] - Ee[0] * Be, ne[1] - Ee[1] * Be);
        }
        fe.zoom(null, Re);
      };
    });
  }
  function K(z, Z, W) {
    return !W && z.__zooming || new ee(z, Z);
  }
  function ee(z, Z) {
    this.that = z, this.args = Z, this.active = 0, this.sourceEvent = null, this.extent = t.apply(z, Z), this.taps = 0;
  }
  ee.prototype = {
    event: function(z) {
      return z && (this.sourceEvent = z), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(z, Z) {
      return this.mouse && z !== "mouse" && (this.mouse[1] = Z.invert(this.mouse[0])), this.touch0 && z !== "touch" && (this.touch0[1] = Z.invert(this.touch0[0])), this.touch1 && z !== "touch" && (this.touch1[1] = Z.invert(this.touch1[0])), this.that.__zoom = Z, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(z) {
      var Z = _e(this.that).datum();
      g.call(
        z,
        this.that,
        new th(z, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: g
        }),
        Z
      );
    }
  };
  function le(z, ...Z) {
    if (!e.apply(this, arguments)) return;
    var W = K(this, Z).event(z), ie = this.__zoom, oe = Math.max(h[0], Math.min(h[1], ie.k * Math.pow(2, l.apply(this, arguments)))), he = it(z);
    if (W.wheel)
      (W.mouse[0][0] !== he[0] || W.mouse[0][1] !== he[1]) && (W.mouse[1] = ie.invert(W.mouse[0] = he)), clearTimeout(W.wheel);
    else {
      if (ie.k === oe) return;
      W.mouse = [he, ie.invert(he)], $n(this), W.start();
    }
    en(z), W.wheel = setTimeout(fe, P), W.zoom("mouse", n(q(D(ie, oe), W.mouse[0], W.mouse[1]), W.extent, c));
    function fe() {
      W.wheel = null, W.end();
    }
  }
  function de(z, ...Z) {
    if (x || !e.apply(this, arguments)) return;
    var W = z.currentTarget, ie = K(this, Z, !0).event(z), oe = _e(z.view).on("mousemove.zoom", ne, !0).on("mouseup.zoom", Ce, !0), he = it(z, W), fe = z.clientX, we = z.clientY;
    Pi(z.view), cr(z), ie.mouse = [he, this.__zoom.invert(he)], $n(this), ie.start();
    function ne(ke) {
      if (en(ke), !ie.moved) {
        var Q = ke.clientX - fe, Ne = ke.clientY - we;
        ie.moved = Q * Q + Ne * Ne > F;
      }
      ie.event(ke).zoom("mouse", n(q(ie.that.__zoom, ie.mouse[0] = it(ke, W), ie.mouse[1]), ie.extent, c));
    }
    function Ce(ke) {
      oe.on("mousemove.zoom mouseup.zoom", null), zi(ke.view, ie.moved), en(ke), ie.event(ke).end();
    }
  }
  function H(z, ...Z) {
    if (e.apply(this, arguments)) {
      var W = this.__zoom, ie = it(z.changedTouches ? z.changedTouches[0] : z, this), oe = W.invert(ie), he = W.k * (z.shiftKey ? 0.5 : 2), fe = n(q(D(W, he), ie, oe), t.apply(this, Z), c);
      en(z), f > 0 ? _e(this).transition().duration(f).call(V, fe, ie, z) : _e(this).call(M.transform, fe, ie, z);
    }
  }
  function ce(z, ...Z) {
    if (e.apply(this, arguments)) {
      var W = z.touches, ie = W.length, oe = K(this, Z, z.changedTouches.length === ie).event(z), he, fe, we, ne;
      for (cr(z), fe = 0; fe < ie; ++fe)
        we = W[fe], ne = it(we, this), ne = [ne, this.__zoom.invert(ne), we.identifier], oe.touch0 ? !oe.touch1 && oe.touch0[2] !== ne[2] && (oe.touch1 = ne, oe.taps = 0) : (oe.touch0 = ne, he = !0, oe.taps = 1 + !!v);
      v && (v = clearTimeout(v)), he && (oe.taps < 2 && (m = ne[0], v = setTimeout(function() {
        v = null;
      }, R)), $n(this), oe.start());
    }
  }
  function ve(z, ...Z) {
    if (this.__zooming) {
      var W = K(this, Z).event(z), ie = z.changedTouches, oe = ie.length, he, fe, we, ne;
      for (en(z), he = 0; he < oe; ++he)
        fe = ie[he], we = it(fe, this), W.touch0 && W.touch0[2] === fe.identifier ? W.touch0[0] = we : W.touch1 && W.touch1[2] === fe.identifier && (W.touch1[0] = we);
      if (fe = W.that.__zoom, W.touch1) {
        var Ce = W.touch0[0], ke = W.touch0[1], Q = W.touch1[0], Ne = W.touch1[1], Re = (Re = Q[0] - Ce[0]) * Re + (Re = Q[1] - Ce[1]) * Re, Ee = (Ee = Ne[0] - ke[0]) * Ee + (Ee = Ne[1] - ke[1]) * Ee;
        fe = D(fe, Math.sqrt(Re / Ee)), we = [(Ce[0] + Q[0]) / 2, (Ce[1] + Q[1]) / 2], ne = [(ke[0] + Ne[0]) / 2, (ke[1] + Ne[1]) / 2];
      } else if (W.touch0) we = W.touch0[0], ne = W.touch0[1];
      else return;
      W.zoom("touch", n(q(fe, we, ne), W.extent, c));
    }
  }
  function re(z, ...Z) {
    if (this.__zooming) {
      var W = K(this, Z).event(z), ie = z.changedTouches, oe = ie.length, he, fe;
      for (cr(z), x && clearTimeout(x), x = setTimeout(function() {
        x = null;
      }, R), he = 0; he < oe; ++he)
        fe = ie[he], W.touch0 && W.touch0[2] === fe.identifier ? delete W.touch0 : W.touch1 && W.touch1[2] === fe.identifier && delete W.touch1;
      if (W.touch1 && !W.touch0 && (W.touch0 = W.touch1, delete W.touch1), W.touch0) W.touch0[1] = this.__zoom.invert(W.touch0[0]);
      else if (W.end(), W.taps === 2 && (fe = it(fe, this), Math.hypot(m[0] - fe[0], m[1] - fe[1]) < A)) {
        var we = _e(this).on("dblclick.zoom");
        we && we.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(z) {
    return arguments.length ? (l = typeof z == "function" ? z : Ln(+z), M) : l;
  }, M.filter = function(z) {
    return arguments.length ? (e = typeof z == "function" ? z : Ln(!!z), M) : e;
  }, M.touchable = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Ln(!!z), M) : a;
  }, M.extent = function(z) {
    return arguments.length ? (t = typeof z == "function" ? z : Ln([[+z[0][0], +z[0][1]], [+z[1][0], +z[1][1]]]), M) : t;
  }, M.scaleExtent = function(z) {
    return arguments.length ? (h[0] = +z[0], h[1] = +z[1], M) : [h[0], h[1]];
  }, M.translateExtent = function(z) {
    return arguments.length ? (c[0][0] = +z[0][0], c[1][0] = +z[1][0], c[0][1] = +z[0][1], c[1][1] = +z[1][1], M) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, M.constrain = function(z) {
    return arguments.length ? (n = z, M) : n;
  }, M.duration = function(z) {
    return arguments.length ? (f = +z, M) : f;
  }, M.interpolate = function(z) {
    return arguments.length ? (p = z, M) : p;
  }, M.on = function() {
    var z = g.on.apply(g, arguments);
    return z === g ? M : z;
  }, M.clickDistance = function(z) {
    return arguments.length ? (F = (z = +z) * z, M) : Math.sqrt(F);
  }, M.tapDistance = function(z) {
    return arguments.length ? (A = +z, M) : A;
  }, M;
}
function ah(e, t) {
  let n = lh().filter((l) => l.button === 0 || l.touches?.length >= 2);
  return uh(n, e, t);
}
function uh(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (l) => t(l, !0)) : e.scaleExtent([1, 1]).on("zoom", (l) => t(l, !1));
}
function et(e) {
  e.preventDefault(), e.stopPropagation();
}
var ue = /* @__PURE__ */ ((e) => (e.CIRCLE = "circle", e.RECTANGLE = "rect", e))(ue || {}), xe = /* @__PURE__ */ ((e) => (e.RIGHT = "RIGHT", e.BOTTOMRIGHT = "BOTTOMRIGHT", e.BOTTOM = "BOTTOM", e.BOTTOMLEFT = "BOTTOMLEFT", e.LEFT = "LEFT", e.TOPLEFT = "TOPLEFT", e.TOP = "TOP", e.TOPRIGHT = "TOPRIGHT", e))(xe || {});
class hh {
  // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
  _nodeProps = {
    shape: ue.RECTANGLE,
    width: 128,
    height: 48,
    cornerRadius: 4,
    reflexiveEdgeStart: "MOVABLE"
  };
  _nodeGUIEditability = {
    fixedPosition: { x: !1, y: !1 },
    deletable: !0,
    labelEditable: !0,
    allowIncomingLinks: !0,
    allowOutgoingLinks: !0
  };
  /**
   * If this is set to true, the nodes can grow dynamically to match the width and height
   * of the labels, provided they exceed the size set in the node props.
   * Words in the label will stay on a single line (no horizontal wrapping).
   *
   * If set to false, the nodes have a fixed size, and label words may wrap to the next line
   * or potentially overflow.
   */
  nodeAutoGrowToLabelSize = !0;
  showNodeLabels = !0;
  nodePhysicsEnabled = !1;
  _linkGUIEditability = {
    deletable: !0,
    labelEditable: !0
  };
  showLinkLabels = !0;
  fixedLinkDistanceEnabled = !1;
  allowNodeCreationViaGUI = !0;
  zoomEnabled = !1;
  markerBoxSize = 4;
  _markerPadding = 2 * this.markerBoxSize;
  set nodeSize(t) {
    this.nodeProps.shape === ue.CIRCLE ? typeof t == "number" ? this.nodeProps.radius = t : this.nodeProps.radius = t.radius ?? 24 : this.nodeProps.shape === ue.RECTANGLE && (typeof t == "number" ? (this.nodeProps.width = t, this.nodeProps.height = t) : (this.nodeProps.width = t.width ?? 48, this.nodeProps.height = t.height ?? 48));
  }
  get nodeSize() {
    let t, n, l;
    return this.nodeProps.shape === ue.CIRCLE ? (l = this.nodeProps.radius, t = 2 * l, n = 2 * l) : (t = this.nodeProps.width, n = this.nodeProps.height, l = t / 2), {
      width: t,
      height: n,
      radius: l
    };
  }
  set nodeProps(t) {
    t.shape = t.shape ?? this._nodeProps.shape, this._nodeProps = t, t.shape === ue.CIRCLE ? this.nodeSize = { radius: t.radius } : t.shape === ue.RECTANGLE && (this.nodeSize = { width: t.width, height: t.height }, t.cornerRadius === void 0 && (this._nodeProps.cornerRadius = 4), t.reflexiveEdgeStart === void 0 && (this._nodeProps.reflexiveEdgeStart = "MOVABLE"));
  }
  get nodeProps() {
    return this._nodeProps;
  }
  set nodeGUIEditability(t) {
    this._nodeGUIEditability = {
      ...this._nodeGUIEditability,
      ...t,
      fixedPosition: {
        ...this._nodeGUIEditability.fixedPosition,
        ...t.fixedPosition
      }
    };
  }
  get nodeGUIEditability() {
    return this._nodeGUIEditability;
  }
  set linkGUIEditability(t) {
    this._linkGUIEditability = {
      ...this._linkGUIEditability,
      ...t
    };
  }
  get linkGUIEditability() {
    return this._linkGUIEditability;
  }
  get markerPadding() {
    return this._markerPadding;
  }
  get markerRef() {
    return this.markerBoxSize / 2;
  }
  get arrowPoints() {
    return [
      [0, 0],
      [0, this.markerBoxSize],
      [this.markerBoxSize, this.markerBoxSize / 2]
    ];
  }
  get markerPath() {
    return [0, 0, this.markerBoxSize, this.markerBoxSize].join(",");
  }
  /**
   * The canvas is bound to the view if zoom is disabled.
   * When zoom (and panning) is enabled, we don't need bounds because the user can navigate to nodes outside the view.
   * When zoom is disabled, bounds are used to ensure all nodes accessible to the user.
   */
  get isCanvasBoundToView() {
    return !this.zoomEnabled;
  }
}
class Xn {
  /**
   * @param id - The internal ID which is used for node referencing.
   * @param props - The properties (size, shape, ...) of the node
   * @param idImported - The external ID provided for imported nodes (solely used for the purpose of imported node creation).
   * @param x - The x coordinate of the node's center
   * @param y - The y coordinate of the node's center
   * @param label - The nodes label
   * @param color - The color of the node which was set (for default color this is empty)
   * @param fixedPosition - A fixed node can't be dragged via GUI and isn't influenced by the simulation forces
   * @param deletable - If the node is deletable via GUI
   * @param labelEditable - If the nodes label is editable via GUI
   * @param allowIncomingLinks - If the node can get new incoming links via GUI
   * @param allowOutgoingLinks - If the node can get new outgoing links via GUI
   */
  constructor(t, n, l, a, h, c, f, p, g, v, m, x) {
    this.id = t, this.props = n, this.idImported = l, this.x = a, this.y = h, this.label = c, this.color = f, this.deletable = g, this.labelEditable = v, this.allowIncomingLinks = m, this.allowOutgoingLinks = x, this.fixedPosition = p, this._renderedSize = this.getSize();
  }
  fx;
  fy;
  _fixedPosition;
  /**
   * @param _renderedSize - The actual size used for rendering the node.
   * By default, this is equal to the size defined in `props`.
   * When nodes are allowed to grow to fit their label size *(`nodeAutoGrowToLabelSize` in `config`)*,
   * `renderedSize` may grow beyond the configured size in `props`.
   */
  _renderedSize;
  set fixedPosition(t) {
    this._fixedPosition = t, this.fx = this.fixedPosition?.x ? this.x : void 0, this.fy = this.fixedPosition?.y ? this.y : void 0;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }
  setShape(t, n) {
    if (t === ue.CIRCLE) {
      let l = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: ue.CIRCLE,
        radius: l
      };
    } else if (t === ue.RECTANGLE) {
      let l = n.nodeProps.width ?? 2 * this.props.radius, a = n.nodeProps.height ?? this.props.radius, h = n.nodeProps.cornerRadius ?? 4, c = n.nodeProps.reflexiveEdgeStart ?? "MOVABLE";
      this.props = {
        shape: ue.RECTANGLE,
        width: l,
        height: a,
        cornerRadius: h,
        reflexiveEdgeStart: c
      };
    }
  }
  setSize(t, n) {
    this.props.shape === ue.CIRCLE ? typeof t == "number" ? this.props.radius = t / 2 : this.props.radius = t.radius ?? n.nodeProps.radius : this.props.shape === ue.RECTANGLE && (typeof t == "number" ? (this.props.width = t, this.props.height = t) : (this.props.width = t.width ?? n.nodeProps.width, this.props.height = t.height ?? n.nodeProps.height));
  }
  /**
   * Returns the node's defined base size.
   *
   * If the node is not allowed to grow to fit its label size, this is identical to the
   * rendered size. Otherwise, the rendered size may be larger, and this value
   * represents the minimal size the node can shrink to.
   */
  getSize() {
    return this.props.shape === ue.CIRCLE ? { radius: this.props.radius } : { width: this.props.width, height: this.props.height };
  }
  /**
   * Sets the nodes rendered size so it is large enough to fit the given size,
   * but at least as large as the minimal size defined in the node properties.
   *
   * @param size - The required size
   */
  set renderedSize(t) {
    if (this.props.shape === ue.CIRCLE) {
      typeof t == "number" && (t = { radius: t / 2 });
      const n = t.radius > this.props.radius ? t.radius : this.props.radius;
      this._renderedSize.radius !== n && (this._renderedSize = { radius: n });
    } else if (this.props.shape === ue.RECTANGLE) {
      typeof t == "number" && (t = { width: t, height: t });
      const n = t.width > this.props.width ? t.width : this.props.width, l = t.height > this.props.height ? t.height : this.props.height;
      (this._renderedSize.width !== n || this._renderedSize.height !== l) && (this._renderedSize = { width: n, height: l });
    }
  }
  get renderedSize() {
    return this._renderedSize;
  }
}
function ch(e, t, n, l) {
  return wl().filter(
    (a, h) => a.button === 0 && //left mouse click
    (h.fixedPosition?.x !== !0 || h.fixedPosition?.y !== !0)
  ).on("start", (a, h) => {
    et(a.sourceEvent), a.active === 0 && e.alphaTarget(0.5).restart(), h.fixedPosition?.x !== !0 && (h.fx = h.x), h.fixedPosition?.y !== !0 && (h.fy = h.y);
  }).on("drag", (a, h) => {
    h.fixedPosition?.x !== !0 && (l.isCanvasBoundToView ? h.props.shape === ue.CIRCLE ? h.fx = Math.max(
      h.renderedSize.radius,
      Math.min(t - h.renderedSize.radius, a.x)
    ) : h.props.shape === ue.RECTANGLE && (h.fx = Math.max(
      0.5 * h.renderedSize.width,
      Math.min(t - 0.5 * h.renderedSize.width, a.x)
    )) : h.fx = a.x), h.fixedPosition?.y !== !0 && (l.isCanvasBoundToView ? h.props.shape === ue.CIRCLE ? h.fy = Math.max(
      h.renderedSize.radius,
      Math.min(n - h.renderedSize.radius, a.y)
    ) : h.props.shape === ue.RECTANGLE && (h.fy = Math.max(
      0.5 * h.renderedSize.height,
      Math.min(n - 0.5 * h.renderedSize.height, a.y)
    )) : h.fy = a.y);
  }).on("end", (a, h) => {
    a.active === 0 && e.alphaTarget(0), h.fixedPosition?.x !== !0 && (h.fx = void 0), h.fixedPosition?.y !== !0 && (h.fy = void 0);
  });
}
function fh(e, t, n, l, a) {
  return e.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (c) => n(c)).on("pointerup", (c) => l(c)).on("contextmenu", (c) => et(c)).on("dblclick", (c) => a(c)).call(t).on("dblclick.zoom", null).append("g");
}
var tt = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(tt || {});
class dh {
  // eslint-disable-next-line no-useless-constructor
  /**
   *
   * @param source - The links source node
   * @param target - The links target node
   * @param pathType - The path type is relevant for correct rendering in the view. It is set by and gets constantly updated during the simulation.
   * @param label - The link label
   * @param color The color of the node which was set (for default color this is empty)
   * @param deletable - If the link is deletable via GUI
   * @param labelEditable - If the link label is editable via GUI
   */
  constructor(t, n, l, a, h, c, f) {
    this.source = t, this.target = n, this.pathType = l, this.label = a, this.color = h, this.deletable = c, this.labelEditable = f, this.id = `${t.id}-${n.id}`;
  }
  id;
}
function gh(e) {
  return e.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function ph(e) {
  return e.append("g").classed("nodes", !0).selectAll(".graph-controller__node-container");
}
function lt(e) {
  let t = [], n = [];
  if (!Array.isArray(e))
    typeof e == "number" ? t = [e] : n = [e];
  else {
    let l = e.map(String);
    n = l.filter((a) => a.includes("-")), t = l.filter((a) => !a.includes("-")).map(Number);
  }
  return [t, n];
}
function Tn(e, t) {
  t !== void 0 && (typeof t == "boolean" ? t ? e.fixedPosition = { x: !0, y: !0 } : e.fixedPosition = { x: !1, y: !1 } : Mt(["x", "y"], Object.keys(t), !0) && (e.fixedPosition = t, rn(["x", "y"], Object.keys(t))));
}
function mh(e, t, n) {
  return `
    M ${-0.5 * e}, ${-0.5 * t + n}
    A ${n},${n} 0 0 1 ${-0.5 * e + n}, ${-0.5 * t}
    H ${0.5 * e - n}
    A ${n},${n} 0 0 1 ${0.5 * e}, ${-0.5 * t + n}
    V ${0.5 * t - n}
    A ${n},${n} 0 0 1 ${0.5 * e - n}, ${0.5 * t}
    H ${-0.5 * e + n}
    A ${n},${n} 0 0 1 ${-0.5 * e}, ${0.5 * t - n}
    Z
`;
}
function fn(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function hi(e) {
  let t = e.target;
  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
}
function wh(e, t, n = 2) {
  const l = Math.abs(e.x - t.x), a = Math.abs(e.y - t.y);
  return l < n && a < n;
}
function rn(e, t, n) {
  let l = !0;
  return t.forEach((a) => {
    e.includes(
      a
      // we actually just check if the type is keyof
    ) || (l = !1, Vt(
      `Option not valid: ${a}`,
      `Use the following: ${e.join(", ")}.`
    ));
  }), l;
}
function Mt(e, t, n) {
  let l = !0, a = e.filter((h) => !t.includes(h));
  return a.length > 0 && (l = !1, n && Vt("Option missing", `Add: ${a}`)), l;
}
function Vt(e, t) {
  console.error(e + `
` + t);
}
function yh(e, t, n, l) {
  if (sn(e, n, t + "-link-arrow", "graph-controller__arrow", !1), sn(
    e,
    n,
    t + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), sn(
    e,
    n,
    t + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), l)
    for (let a of l)
      On(e, t, n, a);
}
function On(e, t, n, l) {
  e.select(`#${t}-link-arrow-` + fn(l)).empty() && (sn(
    e,
    n,
    t + "-link-arrow-" + l,
    "graph-controller__arrow " + l,
    !1,
    l
  ), sn(
    e,
    n,
    t + "-link-arrow-reverse-" + l,
    "graph-controller__arrow colored",
    !0,
    l
  ));
}
function fr(e, t, n) {
  e.select(`#${t}-link-arrow-` + fn(n)).select(function() {
    return this.parentNode;
  }).remove(), e.select(`#${t}-link-arrow-reverse-` + fn(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function sn(e, t, n, l, a, h) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", a ? "auto-start-reverse" : "auto").classed(l, !0).append("path").attr("d", `${eh()(t.arrowPoints)}`).style("fill", h || "");
}
function vh(e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class ci {
  nodeIdCounter = 0;
  nodes = [];
  links = [];
  createNode(t, n, l, a, h, c, f, p, g, v, m) {
    const x = new Xn(
      this.nodeIdCounter++,
      t,
      a,
      n,
      l,
      h,
      c,
      f,
      p,
      g,
      v,
      m
    );
    return this.nodes.push(x), x;
  }
  createLink(t, n, l, a, h, c) {
    if (this.links.find(
      (m) => m.source.id === t && m.target.id === n
    ) !== void 0)
      return;
    const p = this.nodes.find((m) => m.id === t);
    if (p === void 0)
      return;
    const g = this.nodes.find((m) => m.id === n);
    if (g === void 0)
      return;
    const v = new dh(
      p,
      g,
      void 0,
      l,
      a,
      h,
      c
    );
    return this.links.push(v), v;
  }
  removeNode(t) {
    const n = this.nodes.findIndex((a) => a.id === t.id);
    if (n === -1)
      return;
    this.nodes.splice(n, 1);
    const l = this.links.filter(
      (a) => a.source.id === t.id || a.target.id === t.id
    );
    return l.forEach((a) => {
      const h = this.links.indexOf(a, 0);
      this.links.splice(h, 1);
    }), [t, l];
  }
  removeLink(t) {
    const n = this.links.findIndex(
      (l) => l.source.id === t.source.id && l.target.id === t.target.id
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
    return this.links.some((l) => l.color === t && l.id !== n);
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
    return this.links.filter((l) => l.color === t && l.id !== n).map((l) => l.id);
  }
  /**
   * Determine if a source and a target node have a bidirectional link connection.
   * @param source
   * @param target
   */
  hasBidirectionalConnection(t, n) {
    return t.id !== n.id && this.links.some((l) => l.target.id === t.id && l.source.id === n.id) && this.links.some((l) => l.target.id === n.id && l.source.id === t.id);
  }
  /** Formats the graph in trivial graph format.
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeColor TGF normally has no color option, this is just used for internal purposes
   * @param includeLinkColor TGF normally has no color option, this is just used for internal purposes
   * @returns The graph in TGF format
   */
  toTGF(t = !0, n = !0, l = !1, a = !1) {
    if (this.nodes.length === 0 && this.links.length === 0)
      return "";
    let h, c;
    return h = this.nodes.map((f) => {
      let p = `${f.id}`;
      return t && f.label !== void 0 && (p += ` ${f.label}`), l && f.color !== void 0 && (p += ` /COLOR:/${f.color}`), p;
    }).join(`
`), c = this.links.map((f) => {
      let p = `${f.source.id} ${f.target.id}`;
      return n && f.label !== void 0 && (p += ` ${f.label}`), a && f.color !== void 0 && (p += ` /COLOR:/${f.color}`), p;
    }).join(`
`), `${h}${c ? `
#
` : ""}${c}`;
  }
  /** Formats the graph in a json like graph format.
   * @param includeNodePosition if position should be included
   * @param includeNodeLabels if node labels should be included
   * @param includeLinkLabels if link labels should be included
   * @param includeNodeProps if node props should be included
   * @param includeNodeColor if node color should be included
   * @param includeLinkColor if link color should be included
   * @param includeNodeEditability if editability of node via GUI should be included
   * @param includeLinkEditability if editability of link via GUI should be included
   * @returns The graph in JSON format*/
  toJSON(t = !0, n = !0, l = !0, a = !0, h = !0, c = !0, f = !0, p = !0) {
    let g = this.nodes.map((m) => Object.fromEntries(
      Object.entries(m).filter(([x]) => x === "id" || t && (x === "x" || x === "y") || n && x === "label" || a && x === "props" || h && x === "color" || f && [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ].includes(x))
    )), v = this.links.map((m) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(m)).filter(([x]) => x === "sourceId" || x === "targetId" || l && x === "label" || c && x === "color" || p && ["deletable", "labelEditable"].includes(x))
    ));
    return JSON.stringify({ nodes: g, links: v }, null, 4);
  }
  _convertToJSONLink(t) {
    let n = t.id.split("-");
    return {
      sourceId: Number(n[0]),
      targetId: Number(n[1]),
      label: t.label,
      color: t.color,
      deletable: t.deletable,
      labelEditable: t.labelEditable
    };
  }
}
function bh(e) {
  var t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Ki(this.cover(t, n), t, n, e);
}
function Ki(e, t, n, l) {
  if (isNaN(t) || isNaN(n)) return e;
  var a, h = e._root, c = { data: l }, f = e._x0, p = e._y0, g = e._x1, v = e._y1, m, x, R, P, F, A, M, D;
  if (!h) return e._root = c, e;
  for (; h.length; )
    if ((F = t >= (m = (f + g) / 2)) ? f = m : g = m, (A = n >= (x = (p + v) / 2)) ? p = x : v = x, a = h, !(h = h[M = A << 1 | F])) return a[M] = c, e;
  if (R = +e._x.call(null, h.data), P = +e._y.call(null, h.data), t === R && n === P) return c.next = h, a ? a[M] = c : e._root = c, e;
  do
    a = a ? a[M] = new Array(4) : e._root = new Array(4), (F = t >= (m = (f + g) / 2)) ? f = m : g = m, (A = n >= (x = (p + v) / 2)) ? p = x : v = x;
  while ((M = A << 1 | F) === (D = (P >= x) << 1 | R >= m));
  return a[D] = h, a[M] = c, e;
}
function _h(e) {
  var t, n, l = e.length, a, h, c = new Array(l), f = new Array(l), p = 1 / 0, g = 1 / 0, v = -1 / 0, m = -1 / 0;
  for (n = 0; n < l; ++n)
    isNaN(a = +this._x.call(null, t = e[n])) || isNaN(h = +this._y.call(null, t)) || (c[n] = a, f[n] = h, a < p && (p = a), a > v && (v = a), h < g && (g = h), h > m && (m = h));
  for (v < p && (p = this._x0, v = this._x1), m < g && (g = this._y0, m = this._y1), this.cover(p, g).cover(v, m), n = 0; n < l; ++n)
    Ki(this, c[n], f[n], e[n]);
  return this;
}
function xh(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, l = this._y0, a = this._x1, h = this._y1;
  if (isNaN(n))
    a = (n = Math.floor(e)) + 1, h = (l = Math.floor(t)) + 1;
  else if (n > e || e > a || l > t || t > h) {
    var c = a - n, f = this._root, p, g;
    switch (g = (t < (l + h) / 2) << 1 | e < (n + a) / 2) {
      case 0: {
        do
          p = new Array(4), p[g] = f, f = p;
        while (c *= 2, a = n + c, h = l + c, e > a || t > h);
        break;
      }
      case 1: {
        do
          p = new Array(4), p[g] = f, f = p;
        while (c *= 2, n = a - c, h = l + c, n > e || t > h);
        break;
      }
      case 2: {
        do
          p = new Array(4), p[g] = f, f = p;
        while (c *= 2, a = n + c, l = h - c, e > a || l > t);
        break;
      }
      case 3: {
        do
          p = new Array(4), p[g] = f, f = p;
        while (c *= 2, n = a - c, l = h - c, n > e || l > t);
        break;
      }
    }
    this._root && this._root.length && (this._root = f);
  } else return this;
  return this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this;
}
function Eh() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function Sh(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ue(e, t, n, l, a) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = l, this.y1 = a;
}
function kh(e, t, n) {
  var l, a = this._x0, h = this._y0, c, f, p, g, v = this._x1, m = this._y1, x = [], R = this._root, P, F;
  for (R && x.push(new Ue(R, a, h, v, m)), n == null ? n = 1 / 0 : (a = e - n, h = t - n, v = e + n, m = t + n, n *= n); P = x.pop(); )
    if (!(!(R = P.node) || (c = P.x0) > v || (f = P.y0) > m || (p = P.x1) < a || (g = P.y1) < h))
      if (R.length) {
        var A = (c + p) / 2, M = (f + g) / 2;
        x.push(
          new Ue(R[3], A, M, p, g),
          new Ue(R[2], c, M, A, g),
          new Ue(R[1], A, f, p, M),
          new Ue(R[0], c, f, A, M)
        ), (F = (t >= M) << 1 | e >= A) && (P = x[x.length - 1], x[x.length - 1] = x[x.length - 1 - F], x[x.length - 1 - F] = P);
      } else {
        var D = e - +this._x.call(null, R.data), q = t - +this._y.call(null, R.data), I = D * D + q * q;
        if (I < n) {
          var V = Math.sqrt(n = I);
          a = e - V, h = t - V, v = e + V, m = t + V, l = R.data;
        }
      }
  return l;
}
function Mh(e) {
  if (isNaN(v = +this._x.call(null, e)) || isNaN(m = +this._y.call(null, e))) return this;
  var t, n = this._root, l, a, h, c = this._x0, f = this._y0, p = this._x1, g = this._y1, v, m, x, R, P, F, A, M;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((P = v >= (x = (c + p) / 2)) ? c = x : p = x, (F = m >= (R = (f + g) / 2)) ? f = R : g = R, t = n, !(n = n[A = F << 1 | P])) return this;
    if (!n.length) break;
    (t[A + 1 & 3] || t[A + 2 & 3] || t[A + 3 & 3]) && (l = t, M = A);
  }
  for (; n.data !== e; ) if (a = n, !(n = n.next)) return this;
  return (h = n.next) && delete n.next, a ? (h ? a.next = h : delete a.next, this) : t ? (h ? t[A] = h : delete t[A], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (l ? l[M] = n : this._root = n), this) : (this._root = h, this);
}
function Nh(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Lh() {
  return this._root;
}
function Th() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Rh(e) {
  var t = [], n, l = this._root, a, h, c, f, p;
  for (l && t.push(new Ue(l, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(l = n.node, h = n.x0, c = n.y0, f = n.x1, p = n.y1) && l.length) {
      var g = (h + f) / 2, v = (c + p) / 2;
      (a = l[3]) && t.push(new Ue(a, g, v, f, p)), (a = l[2]) && t.push(new Ue(a, h, v, g, p)), (a = l[1]) && t.push(new Ue(a, g, c, f, v)), (a = l[0]) && t.push(new Ue(a, h, c, g, v));
    }
  return this;
}
function Ch(e) {
  var t = [], n = [], l;
  for (this._root && t.push(new Ue(this._root, this._x0, this._y0, this._x1, this._y1)); l = t.pop(); ) {
    var a = l.node;
    if (a.length) {
      var h, c = l.x0, f = l.y0, p = l.x1, g = l.y1, v = (c + p) / 2, m = (f + g) / 2;
      (h = a[0]) && t.push(new Ue(h, c, f, v, m)), (h = a[1]) && t.push(new Ue(h, v, f, p, m)), (h = a[2]) && t.push(new Ue(h, c, m, v, g)), (h = a[3]) && t.push(new Ue(h, v, m, p, g));
    }
    n.push(l);
  }
  for (; l = n.pop(); )
    e(l.node, l.x0, l.y0, l.x1, l.y1);
  return this;
}
function Ih(e) {
  return e[0];
}
function Ph(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function zh(e) {
  return e[1];
}
function $h(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Hi(e, t, n) {
  var l = new Ar(t ?? Ih, n ?? zh, NaN, NaN, NaN, NaN);
  return e == null ? l : l.addAll(e);
}
function Ar(e, t, n, l, a, h) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this._root = void 0;
}
function fi(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Qe = Hi.prototype = Ar.prototype;
Qe.copy = function() {
  var e = new Ar(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, l;
  if (!t) return e;
  if (!t.length) return e._root = fi(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var a = 0; a < 4; ++a)
      (l = t.source[a]) && (l.length ? n.push({ source: l, target: t.target[a] = new Array(4) }) : t.target[a] = fi(l));
  return e;
};
Qe.add = bh;
Qe.addAll = _h;
Qe.cover = xh;
Qe.data = Eh;
Qe.extent = Sh;
Qe.find = kh;
Qe.remove = Mh;
Qe.removeAll = Nh;
Qe.root = Lh;
Qe.size = Th;
Qe.visit = Rh;
Qe.visitAfter = Ch;
Qe.x = Ph;
Qe.y = $h;
function Oh(e) {
  function t(m) {
    return m.x + m.vx;
  }
  function n(m) {
    return m.y + m.vy;
  }
  function l(m) {
    return function() {
      return m;
    };
  }
  var a, h, c = 1, f = 1;
  typeof e != "function" && (e = l(e === null ? [[0, 0][1]] : e));
  function p() {
    var m, x, R, P, F, A, M, D, q, I, V = [];
    a.forEach(function(H, ce) {
      V.push({ node: H, vx: H.vx, vy: H.vy, x: H.x + (h[ce][1][0] + h[ce][0][0]) / 2, y: H.y + (h[ce][0][1] + h[ce][1][1]) / 2 }), V.push({ node: H, vx: H.vx, vy: H.vy, x: H.x + h[ce][0][0], y: H.y + h[ce][0][1] }), V.push({ node: H, vx: H.vx, vy: H.vy, x: H.x + h[ce][0][0], y: H.y + h[ce][1][1] }), V.push({ node: H, vx: H.vx, vy: H.vy, x: H.x + h[ce][1][0], y: H.y + h[ce][0][1] }), V.push({ node: H, vx: H.vx, vy: H.vy, x: H.x + h[ce][1][0], y: H.y + h[ce][1][1] });
    });
    for (var K = V.length, ee = 0; ee < f; ++ee)
      for (x = Hi(V, t, n).visitAfter(g), m = 0; m < K; ++m) {
        var le = ~~(m / 5);
        R = a[le], A = h[le], P = R.x + R.vx, F = R.y + R.vy, M = P + A[0][0], D = F + A[0][1], q = P + A[1][0], I = F + A[1][1], x.visit(de);
      }
    function de(H, ce, ve, re, z) {
      var Z = H.data;
      if (Z) {
        var W = v(A, 0), ie = v(A, 1);
        if (Z.node.index !== le) {
          var oe = Z.node, he = h[oe.index], fe = oe.x + oe.vx + he[0][0], we = oe.y + oe.vy + he[0][1], ne = oe.x + oe.vx + he[1][0], Ce = oe.y + oe.vy + he[1][1], ke = v(he, 0), Q = v(he, 1);
          if (M <= ne && fe <= q && D <= Ce && we <= I) {
            var Ne = [Math.min.apply(null, [fe, ne, M, q]), Math.max.apply(null, [fe, ne, M, q])], Re = [Math.min.apply(null, [we, Ce, D, I]), Math.max.apply(null, [we, Ce, D, I])], Ee = W + ke - (Ne[1] - Ne[0]), Be = ie + Q - (Re[1] - Re[0]), yt = Ee * c * (Be / ie), ct = Be * c * (Ee / W), Tt = Ee * c * (Be / Q), Rt = Be * c * (Ee / ke);
            (M + q) / 2 < (fe + ne) / 2 ? (R.vx -= yt, oe.vx += Tt) : (R.vx += yt, oe.vx -= Tt), (D + I) / 2 < (we + Ce) / 2 ? (R.vy -= ct, oe.vy += Rt) : (R.vy += ct, oe.vy -= Rt);
          }
        }
        return;
      }
      return ce > q || re < M || ve > I || z < D;
    }
  }
  function g(m) {
    if (m.data)
      return m.bb = h[m.data.node.index];
    m.bb = [[0, 0], [0, 0]];
    for (var x = 0; x < 4; ++x)
      m[x] && m[x].bb[0][0] < m.bb[0][0] && (m.bb[0][0] = m[x].bb[0][0]), m[x] && m[x].bb[0][1] < m.bb[0][1] && (m.bb[0][1] = m[x].bb[0][1]), m[x] && m[x].bb[1][0] > m.bb[1][0] && (m.bb[1][0] = m[x].bb[1][0]), m[x] && m[x].bb[1][1] > m.bb[1][1] && (m.bb[1][1] = m[x].bb[1][1]);
  }
  function v(m, x) {
    return m[1][x] - m[0][x];
  }
  return p.initialize = function(m) {
    var x, R = (a = m).length;
    for (h = new Array(R), x = 0; x < R; ++x) h[x] = e(a[x], x, a);
  }, p.iterations = function(m) {
    return arguments.length ? (f = +m, p) : f;
  }, p.strength = function(m) {
    return arguments.length ? (c = +m, p) : c;
  }, p.bbox = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : l(+m), p) : e;
  }, p;
}
function Ah(e, t, n, l, a) {
  let h = Ou(e.nodes).on("tick", () => a());
  return h = An(h, e, t), t.isCanvasBoundToView && (h = Fh(h, e, n, l)), h = ts(h, e, t, t.fixedLinkDistanceEnabled), h = es(h, t.nodePhysicsEnabled, n, l), h;
}
function An(e, t, n) {
  return (!t.nodes || t.nodes.length === 0 ? n.nodeProps.shape === ue.CIRCLE : t.nodes.every((a) => a.props.shape === ue.CIRCLE)) ? e.force(
    "collideCircle",
    Mu().radius((a) => a.renderedSize.radius)
  ).force("collideBox", null) : e.force(
    "collideBox",
    Oh((a) => {
      if (a.props.shape === ue.CIRCLE)
        return [
          [
            -a.renderedSize.radius,
            -a.renderedSize.radius
          ],
          [
            a.renderedSize.radius,
            a.renderedSize.radius
          ]
        ];
      if (a.props.shape === ue.RECTANGLE)
        return [
          [
            -0.5 * a.renderedSize.width,
            -0.5 * a.renderedSize.height
          ],
          [
            0.5 * a.renderedSize.width,
            0.5 * a.renderedSize.height
          ]
        ];
    })
  ).force("collideCircle", null);
}
function Fh(e, t, n, l) {
  return e.force("bounds", () => {
    for (const a of t.nodes)
      a.props.shape === ue.CIRCLE ? (a.x = Math.max(
        a.renderedSize.radius,
        Math.min(n - a.renderedSize.radius, a.x)
      ), a.y = Math.max(
        a.renderedSize.radius,
        Math.min(l - a.renderedSize.radius, a.y)
      )) : a.props.shape === ue.RECTANGLE && (a.x = Math.max(
        0.5 * a.renderedSize.width,
        Math.min(n - 0.5 * a.renderedSize.width, a.x)
      ), a.y = Math.max(
        0.5 * a.renderedSize.height,
        Math.min(l - 0.5 * a.renderedSize.height, a.y)
      ));
  });
}
function es(e, t, n, l) {
  return t ? e.force("charge", Au().strength(-500)).force("x", Fu(n / 2).strength(0.05)).force("y", Bu(l / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function ts(e, t, n, l) {
  if (l) {
    let a = 0;
    return n.nodeProps.shape === ue.CIRCLE ? a = n.nodeProps.radius : n.nodeProps.shape === ue.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? a = n.nodeProps.width / 2 : a = n.nodeProps.height / 2), e.force(
      "link",
      Lu().links(t.links).id((h) => h.id).distance(a * 10)
    );
  } else
    return e.force("link", null);
}
function ns(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function rs(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function l() {
      var a = !1;
      try {
        a = this instanceof l;
      } catch {
      }
      return a ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(l) {
    var a = Object.getOwnPropertyDescriptor(e, l);
    Object.defineProperty(n, l, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[l];
      }
    });
  }), n;
}
var ye = {};
const Bh = Object.prototype.toString;
function dn(e) {
  const t = Bh.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
const jh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAnyArray: dn
}, Symbol.toStringTag, { value: "Module" })), Dh = /* @__PURE__ */ rs(jh);
function Gh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!dn(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, l = n === void 0 ? 0 : n, a = t.toIndex, h = a === void 0 ? e.length : a;
  if (l < 0 || l >= e.length || !Number.isInteger(l))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (h <= l || h > e.length || !Number.isInteger(h))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var c = e[l], f = l + 1; f < h; f++)
    e[f] > c && (c = e[f]);
  return c;
}
function Vh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!dn(e))
    throw new TypeError("input must be an array");
  if (e.length === 0)
    throw new TypeError("input must not be empty");
  var n = t.fromIndex, l = n === void 0 ? 0 : n, a = t.toIndex, h = a === void 0 ? e.length : a;
  if (l < 0 || l >= e.length || !Number.isInteger(l))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (h <= l || h > e.length || !Number.isInteger(h))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var c = e[l], f = l + 1; f < h; f++)
    e[f] < c && (c = e[f]);
  return c;
}
function qh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (dn(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!dn(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var l = Vh(e), a = Gh(e);
  if (l === a)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var h = t.min, c = h === void 0 ? t.autoMinMax ? l : 0 : h, f = t.max, p = f === void 0 ? t.autoMinMax ? a : 1 : f;
  if (c >= p)
    throw new RangeError("min option must be smaller than max option");
  for (var g = (p - c) / (a - l), v = 0; v < e.length; v++)
    n[v] = (e[v] - l) * g + c;
  return n;
}
const Uh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qh
}, Symbol.toStringTag, { value: "Module" })), Wh = /* @__PURE__ */ rs(Uh);
var di;
function Xh() {
  if (di) return ye;
  di = 1, Object.defineProperty(ye, "__esModule", { value: !0 });
  var e = Dh, t = Wh;
  const n = " ".repeat(2), l = " ".repeat(4);
  function a() {
    return h(this);
  }
  function h(d, i = {}) {
    const {
      maxRows: s = 15,
      maxColumns: r = 10,
      maxNumSize: o = 8,
      padMinus: u = "auto"
    } = i;
    return `${d.constructor.name} {
${n}[
${l}${c(d, s, r, o, u)}
${n}]
${n}rows: ${d.rows}
${n}columns: ${d.columns}
}`;
  }
  function c(d, i, s, r, o) {
    const { rows: u, columns: b } = d, _ = Math.min(u, i), S = Math.min(b, s), k = [];
    if (o === "auto") {
      o = !1;
      e: for (let $ = 0; $ < _; $++)
        for (let T = 0; T < S; T++)
          if (d.get($, T) < 0) {
            o = !0;
            break e;
          }
    }
    for (let $ = 0; $ < _; $++) {
      let T = [];
      for (let G = 0; G < S; G++)
        T.push(f(d.get($, G), r, o));
      k.push(`${T.join(" ")}`);
    }
    return S !== b && (k[k.length - 1] += ` ... ${b - s} more columns`), _ !== u && k.push(`... ${u - i} more rows`), k.join(`
${l}`);
  }
  function f(d, i, s) {
    return (d >= 0 && s ? ` ${p(d, i - 1)}` : p(d, i)).padEnd(i);
  }
  function p(d, i) {
    let s = d.toString();
    if (s.length <= i) return s;
    let r = d.toFixed(i);
    if (r.length > i && (r = d.toFixed(Math.max(0, i - (r.length - i)))), r.length <= i && !r.startsWith("0.000") && !r.startsWith("-0.000"))
      return r;
    let o = d.toExponential(i);
    return o.length > i && (o = d.toExponential(Math.max(0, i - (o.length - i)))), o.slice(0);
  }
  function g(d, i) {
    d.prototype.add = function(r) {
      return typeof r == "number" ? this.addS(r) : this.addM(r);
    }, d.prototype.addS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) + r);
      return this;
    }, d.prototype.addM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) + r.get(o, u));
      return this;
    }, d.add = function(r, o) {
      return new i(r).add(o);
    }, d.prototype.sub = function(r) {
      return typeof r == "number" ? this.subS(r) : this.subM(r);
    }, d.prototype.subS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) - r);
      return this;
    }, d.prototype.subM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) - r.get(o, u));
      return this;
    }, d.sub = function(r, o) {
      return new i(r).sub(o);
    }, d.prototype.subtract = d.prototype.sub, d.prototype.subtractS = d.prototype.subS, d.prototype.subtractM = d.prototype.subM, d.subtract = d.sub, d.prototype.mul = function(r) {
      return typeof r == "number" ? this.mulS(r) : this.mulM(r);
    }, d.prototype.mulS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) * r);
      return this;
    }, d.prototype.mulM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) * r.get(o, u));
      return this;
    }, d.mul = function(r, o) {
      return new i(r).mul(o);
    }, d.prototype.multiply = d.prototype.mul, d.prototype.multiplyS = d.prototype.mulS, d.prototype.multiplyM = d.prototype.mulM, d.multiply = d.mul, d.prototype.div = function(r) {
      return typeof r == "number" ? this.divS(r) : this.divM(r);
    }, d.prototype.divS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) / r);
      return this;
    }, d.prototype.divM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) / r.get(o, u));
      return this;
    }, d.div = function(r, o) {
      return new i(r).div(o);
    }, d.prototype.divide = d.prototype.div, d.prototype.divideS = d.prototype.divS, d.prototype.divideM = d.prototype.divM, d.divide = d.div, d.prototype.mod = function(r) {
      return typeof r == "number" ? this.modS(r) : this.modM(r);
    }, d.prototype.modS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) % r);
      return this;
    }, d.prototype.modM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) % r.get(o, u));
      return this;
    }, d.mod = function(r, o) {
      return new i(r).mod(o);
    }, d.prototype.modulus = d.prototype.mod, d.prototype.modulusS = d.prototype.modS, d.prototype.modulusM = d.prototype.modM, d.modulus = d.mod, d.prototype.and = function(r) {
      return typeof r == "number" ? this.andS(r) : this.andM(r);
    }, d.prototype.andS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) & r);
      return this;
    }, d.prototype.andM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) & r.get(o, u));
      return this;
    }, d.and = function(r, o) {
      return new i(r).and(o);
    }, d.prototype.or = function(r) {
      return typeof r == "number" ? this.orS(r) : this.orM(r);
    }, d.prototype.orS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) | r);
      return this;
    }, d.prototype.orM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) | r.get(o, u));
      return this;
    }, d.or = function(r, o) {
      return new i(r).or(o);
    }, d.prototype.xor = function(r) {
      return typeof r == "number" ? this.xorS(r) : this.xorM(r);
    }, d.prototype.xorS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ^ r);
      return this;
    }, d.prototype.xorM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ^ r.get(o, u));
      return this;
    }, d.xor = function(r, o) {
      return new i(r).xor(o);
    }, d.prototype.leftShift = function(r) {
      return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
    }, d.prototype.leftShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) << r);
      return this;
    }, d.prototype.leftShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) << r.get(o, u));
      return this;
    }, d.leftShift = function(r, o) {
      return new i(r).leftShift(o);
    }, d.prototype.signPropagatingRightShift = function(r) {
      return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
    }, d.prototype.signPropagatingRightShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >> r);
      return this;
    }, d.prototype.signPropagatingRightShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >> r.get(o, u));
      return this;
    }, d.signPropagatingRightShift = function(r, o) {
      return new i(r).signPropagatingRightShift(o);
    }, d.prototype.rightShift = function(r) {
      return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
    }, d.prototype.rightShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >>> r);
      return this;
    }, d.prototype.rightShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >>> r.get(o, u));
      return this;
    }, d.rightShift = function(r, o) {
      return new i(r).rightShift(o);
    }, d.prototype.zeroFillRightShift = d.prototype.rightShift, d.prototype.zeroFillRightShiftS = d.prototype.rightShiftS, d.prototype.zeroFillRightShiftM = d.prototype.rightShiftM, d.zeroFillRightShift = d.rightShift, d.prototype.not = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, ~this.get(r, o));
      return this;
    }, d.not = function(r) {
      return new i(r).not();
    }, d.prototype.abs = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.abs(this.get(r, o)));
      return this;
    }, d.abs = function(r) {
      return new i(r).abs();
    }, d.prototype.acos = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.acos(this.get(r, o)));
      return this;
    }, d.acos = function(r) {
      return new i(r).acos();
    }, d.prototype.acosh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.acosh(this.get(r, o)));
      return this;
    }, d.acosh = function(r) {
      return new i(r).acosh();
    }, d.prototype.asin = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.asin(this.get(r, o)));
      return this;
    }, d.asin = function(r) {
      return new i(r).asin();
    }, d.prototype.asinh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.asinh(this.get(r, o)));
      return this;
    }, d.asinh = function(r) {
      return new i(r).asinh();
    }, d.prototype.atan = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.atan(this.get(r, o)));
      return this;
    }, d.atan = function(r) {
      return new i(r).atan();
    }, d.prototype.atanh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.atanh(this.get(r, o)));
      return this;
    }, d.atanh = function(r) {
      return new i(r).atanh();
    }, d.prototype.cbrt = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cbrt(this.get(r, o)));
      return this;
    }, d.cbrt = function(r) {
      return new i(r).cbrt();
    }, d.prototype.ceil = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.ceil(this.get(r, o)));
      return this;
    }, d.ceil = function(r) {
      return new i(r).ceil();
    }, d.prototype.clz32 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.clz32(this.get(r, o)));
      return this;
    }, d.clz32 = function(r) {
      return new i(r).clz32();
    }, d.prototype.cos = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cos(this.get(r, o)));
      return this;
    }, d.cos = function(r) {
      return new i(r).cos();
    }, d.prototype.cosh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cosh(this.get(r, o)));
      return this;
    }, d.cosh = function(r) {
      return new i(r).cosh();
    }, d.prototype.exp = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.exp(this.get(r, o)));
      return this;
    }, d.exp = function(r) {
      return new i(r).exp();
    }, d.prototype.expm1 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.expm1(this.get(r, o)));
      return this;
    }, d.expm1 = function(r) {
      return new i(r).expm1();
    }, d.prototype.floor = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.floor(this.get(r, o)));
      return this;
    }, d.floor = function(r) {
      return new i(r).floor();
    }, d.prototype.fround = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.fround(this.get(r, o)));
      return this;
    }, d.fround = function(r) {
      return new i(r).fround();
    }, d.prototype.log = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log(this.get(r, o)));
      return this;
    }, d.log = function(r) {
      return new i(r).log();
    }, d.prototype.log1p = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log1p(this.get(r, o)));
      return this;
    }, d.log1p = function(r) {
      return new i(r).log1p();
    }, d.prototype.log10 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log10(this.get(r, o)));
      return this;
    }, d.log10 = function(r) {
      return new i(r).log10();
    }, d.prototype.log2 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log2(this.get(r, o)));
      return this;
    }, d.log2 = function(r) {
      return new i(r).log2();
    }, d.prototype.round = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.round(this.get(r, o)));
      return this;
    }, d.round = function(r) {
      return new i(r).round();
    }, d.prototype.sign = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sign(this.get(r, o)));
      return this;
    }, d.sign = function(r) {
      return new i(r).sign();
    }, d.prototype.sin = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sin(this.get(r, o)));
      return this;
    }, d.sin = function(r) {
      return new i(r).sin();
    }, d.prototype.sinh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sinh(this.get(r, o)));
      return this;
    }, d.sinh = function(r) {
      return new i(r).sinh();
    }, d.prototype.sqrt = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sqrt(this.get(r, o)));
      return this;
    }, d.sqrt = function(r) {
      return new i(r).sqrt();
    }, d.prototype.tan = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.tan(this.get(r, o)));
      return this;
    }, d.tan = function(r) {
      return new i(r).tan();
    }, d.prototype.tanh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.tanh(this.get(r, o)));
      return this;
    }, d.tanh = function(r) {
      return new i(r).tanh();
    }, d.prototype.trunc = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.trunc(this.get(r, o)));
      return this;
    }, d.trunc = function(r) {
      return new i(r).trunc();
    }, d.pow = function(r, o) {
      return new i(r).pow(o);
    }, d.prototype.pow = function(r) {
      return typeof r == "number" ? this.powS(r) : this.powM(r);
    }, d.prototype.powS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ** r);
      return this;
    }, d.prototype.powM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ** r.get(o, u));
      return this;
    };
  }
  function v(d, i, s) {
    let r = s ? d.rows : d.rows - 1;
    if (i < 0 || i > r)
      throw new RangeError("Row index out of range");
  }
  function m(d, i, s) {
    let r = s ? d.columns : d.columns - 1;
    if (i < 0 || i > r)
      throw new RangeError("Column index out of range");
  }
  function x(d, i) {
    if (i.to1DArray && (i = i.to1DArray()), i.length !== d.columns)
      throw new RangeError(
        "vector size must be the same as the number of columns"
      );
    return i;
  }
  function R(d, i) {
    if (i.to1DArray && (i = i.to1DArray()), i.length !== d.rows)
      throw new RangeError("vector size must be the same as the number of rows");
    return i;
  }
  function P(d, i) {
    if (!e.isAnyArray(i))
      throw new TypeError("row indices must be an array");
    for (let s = 0; s < i.length; s++)
      if (i[s] < 0 || i[s] >= d.rows)
        throw new RangeError("row indices are out of range");
  }
  function F(d, i) {
    if (!e.isAnyArray(i))
      throw new TypeError("column indices must be an array");
    for (let s = 0; s < i.length; s++)
      if (i[s] < 0 || i[s] >= d.columns)
        throw new RangeError("column indices are out of range");
  }
  function A(d, i, s, r, o) {
    if (arguments.length !== 5)
      throw new RangeError("expected 4 arguments");
    if (D("startRow", i), D("endRow", s), D("startColumn", r), D("endColumn", o), i > s || r > o || i < 0 || i >= d.rows || s < 0 || s >= d.rows || r < 0 || r >= d.columns || o < 0 || o >= d.columns)
      throw new RangeError("Submatrix indices are out of range");
  }
  function M(d, i = 0) {
    let s = [];
    for (let r = 0; r < d; r++)
      s.push(i);
    return s;
  }
  function D(d, i) {
    if (typeof i != "number")
      throw new TypeError(`${d} must be a number`);
  }
  function q(d) {
    if (d.isEmpty())
      throw new Error("Empty matrix has no elements to index");
  }
  function I(d) {
    let i = M(d.rows);
    for (let s = 0; s < d.rows; ++s)
      for (let r = 0; r < d.columns; ++r)
        i[s] += d.get(s, r);
    return i;
  }
  function V(d) {
    let i = M(d.columns);
    for (let s = 0; s < d.rows; ++s)
      for (let r = 0; r < d.columns; ++r)
        i[r] += d.get(s, r);
    return i;
  }
  function K(d) {
    let i = 0;
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        i += d.get(s, r);
    return i;
  }
  function ee(d) {
    let i = M(d.rows, 1);
    for (let s = 0; s < d.rows; ++s)
      for (let r = 0; r < d.columns; ++r)
        i[s] *= d.get(s, r);
    return i;
  }
  function le(d) {
    let i = M(d.columns, 1);
    for (let s = 0; s < d.rows; ++s)
      for (let r = 0; r < d.columns; ++r)
        i[r] *= d.get(s, r);
    return i;
  }
  function de(d) {
    let i = 1;
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        i *= d.get(s, r);
    return i;
  }
  function H(d, i, s) {
    const r = d.rows, o = d.columns, u = [];
    for (let b = 0; b < r; b++) {
      let _ = 0, S = 0, k = 0;
      for (let $ = 0; $ < o; $++)
        k = d.get(b, $) - s[b], _ += k, S += k * k;
      i ? u.push((S - _ * _ / o) / (o - 1)) : u.push((S - _ * _ / o) / o);
    }
    return u;
  }
  function ce(d, i, s) {
    const r = d.rows, o = d.columns, u = [];
    for (let b = 0; b < o; b++) {
      let _ = 0, S = 0, k = 0;
      for (let $ = 0; $ < r; $++)
        k = d.get($, b) - s[b], _ += k, S += k * k;
      i ? u.push((S - _ * _ / r) / (r - 1)) : u.push((S - _ * _ / r) / r);
    }
    return u;
  }
  function ve(d, i, s) {
    const r = d.rows, o = d.columns, u = r * o;
    let b = 0, _ = 0, S = 0;
    for (let k = 0; k < r; k++)
      for (let $ = 0; $ < o; $++)
        S = d.get(k, $) - s, b += S, _ += S * S;
    return i ? (_ - b * b / u) / (u - 1) : (_ - b * b / u) / u;
  }
  function re(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) - i[s]);
  }
  function z(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) - i[r]);
  }
  function Z(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) - i);
  }
  function W(d) {
    const i = [];
    for (let s = 0; s < d.rows; s++) {
      let r = 0;
      for (let o = 0; o < d.columns; o++)
        r += d.get(s, o) ** 2 / (d.columns - 1);
      i.push(Math.sqrt(r));
    }
    return i;
  }
  function ie(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) / i[s]);
  }
  function oe(d) {
    const i = [];
    for (let s = 0; s < d.columns; s++) {
      let r = 0;
      for (let o = 0; o < d.rows; o++)
        r += d.get(o, s) ** 2 / (d.rows - 1);
      i.push(Math.sqrt(r));
    }
    return i;
  }
  function he(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) / i[r]);
  }
  function fe(d) {
    const i = d.size - 1;
    let s = 0;
    for (let r = 0; r < d.columns; r++)
      for (let o = 0; o < d.rows; o++)
        s += d.get(o, r) ** 2 / i;
    return Math.sqrt(s);
  }
  function we(d, i) {
    for (let s = 0; s < d.rows; s++)
      for (let r = 0; r < d.columns; r++)
        d.set(s, r, d.get(s, r) / i);
  }
  class ne {
    static from1DArray(i, s, r) {
      if (i * s !== r.length)
        throw new RangeError("data length does not match given dimensions");
      let u = new Q(i, s);
      for (let b = 0; b < i; b++)
        for (let _ = 0; _ < s; _++)
          u.set(b, _, r[b * s + _]);
      return u;
    }
    static rowVector(i) {
      let s = new Q(1, i.length);
      for (let r = 0; r < i.length; r++)
        s.set(0, r, i[r]);
      return s;
    }
    static columnVector(i) {
      let s = new Q(i.length, 1);
      for (let r = 0; r < i.length; r++)
        s.set(r, 0, i[r]);
      return s;
    }
    static zeros(i, s) {
      return new Q(i, s);
    }
    static ones(i, s) {
      return new Q(i, s).fill(1);
    }
    static rand(i, s, r = {}) {
      if (typeof r != "object")
        throw new TypeError("options must be an object");
      const { random: o = Math.random } = r;
      let u = new Q(i, s);
      for (let b = 0; b < i; b++)
        for (let _ = 0; _ < s; _++)
          u.set(b, _, o());
      return u;
    }
    static randInt(i, s, r = {}) {
      if (typeof r != "object")
        throw new TypeError("options must be an object");
      const { min: o = 0, max: u = 1e3, random: b = Math.random } = r;
      if (!Number.isInteger(o)) throw new TypeError("min must be an integer");
      if (!Number.isInteger(u)) throw new TypeError("max must be an integer");
      if (o >= u) throw new RangeError("min must be smaller than max");
      let _ = u - o, S = new Q(i, s);
      for (let k = 0; k < i; k++)
        for (let $ = 0; $ < s; $++) {
          let T = o + Math.round(b() * _);
          S.set(k, $, T);
        }
      return S;
    }
    static eye(i, s, r) {
      s === void 0 && (s = i), r === void 0 && (r = 1);
      let o = Math.min(i, s), u = this.zeros(i, s);
      for (let b = 0; b < o; b++)
        u.set(b, b, r);
      return u;
    }
    static diag(i, s, r) {
      let o = i.length;
      s === void 0 && (s = o), r === void 0 && (r = s);
      let u = Math.min(o, s, r), b = this.zeros(s, r);
      for (let _ = 0; _ < u; _++)
        b.set(_, _, i[_]);
      return b;
    }
    static min(i, s) {
      i = this.checkMatrix(i), s = this.checkMatrix(s);
      let r = i.rows, o = i.columns, u = new Q(r, o);
      for (let b = 0; b < r; b++)
        for (let _ = 0; _ < o; _++)
          u.set(b, _, Math.min(i.get(b, _), s.get(b, _)));
      return u;
    }
    static max(i, s) {
      i = this.checkMatrix(i), s = this.checkMatrix(s);
      let r = i.rows, o = i.columns, u = new this(r, o);
      for (let b = 0; b < r; b++)
        for (let _ = 0; _ < o; _++)
          u.set(b, _, Math.max(i.get(b, _), s.get(b, _)));
      return u;
    }
    static checkMatrix(i) {
      return ne.isMatrix(i) ? i : new Q(i);
    }
    static isMatrix(i) {
      return i != null && i.klass === "Matrix";
    }
    get size() {
      return this.rows * this.columns;
    }
    apply(i) {
      if (typeof i != "function")
        throw new TypeError("callback must be a function");
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          i.call(this, s, r);
      return this;
    }
    to1DArray() {
      let i = [];
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          i.push(this.get(s, r));
      return i;
    }
    to2DArray() {
      let i = [];
      for (let s = 0; s < this.rows; s++) {
        i.push([]);
        for (let r = 0; r < this.columns; r++)
          i[s].push(this.get(s, r));
      }
      return i;
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
        for (let i = 0; i < this.rows; i++)
          for (let s = 0; s <= i; s++)
            if (this.get(i, s) !== this.get(s, i))
              return !1;
        return !0;
      }
      return !1;
    }
    isDistance() {
      if (!this.isSymmetric()) return !1;
      for (let i = 0; i < this.rows; i++)
        if (this.get(i, i) !== 0) return !1;
      return !0;
    }
    isEchelonForm() {
      let i = 0, s = 0, r = -1, o = !0, u = !1;
      for (; i < this.rows && o; ) {
        for (s = 0, u = !1; s < this.columns && u === !1; )
          this.get(i, s) === 0 ? s++ : this.get(i, s) === 1 && s > r ? (u = !0, r = s) : (o = !1, u = !0);
        i++;
      }
      return o;
    }
    isReducedEchelonForm() {
      let i = 0, s = 0, r = -1, o = !0, u = !1;
      for (; i < this.rows && o; ) {
        for (s = 0, u = !1; s < this.columns && u === !1; )
          this.get(i, s) === 0 ? s++ : this.get(i, s) === 1 && s > r ? (u = !0, r = s) : (o = !1, u = !0);
        for (let b = s + 1; b < this.rows; b++)
          this.get(i, b) !== 0 && (o = !1);
        i++;
      }
      return o;
    }
    echelonForm() {
      let i = this.clone(), s = 0, r = 0;
      for (; s < i.rows && r < i.columns; ) {
        let o = s;
        for (let u = s; u < i.rows; u++)
          i.get(u, r) > i.get(o, r) && (o = u);
        if (i.get(o, r) === 0)
          r++;
        else {
          i.swapRows(s, o);
          let u = i.get(s, r);
          for (let b = r; b < i.columns; b++)
            i.set(s, b, i.get(s, b) / u);
          for (let b = s + 1; b < i.rows; b++) {
            let _ = i.get(b, r) / i.get(s, r);
            i.set(b, r, 0);
            for (let S = r + 1; S < i.columns; S++)
              i.set(b, S, i.get(b, S) - i.get(s, S) * _);
          }
          s++, r++;
        }
      }
      return i;
    }
    reducedEchelonForm() {
      let i = this.echelonForm(), s = i.columns, r = i.rows, o = r - 1;
      for (; o >= 0; )
        if (i.maxRow(o) === 0)
          o--;
        else {
          let u = 0, b = !1;
          for (; u < r && b === !1; )
            i.get(o, u) === 1 ? b = !0 : u++;
          for (let _ = 0; _ < o; _++) {
            let S = i.get(_, u);
            for (let k = u; k < s; k++) {
              let $ = i.get(_, k) - S * i.get(o, k);
              i.set(_, k, $);
            }
          }
          o--;
        }
      return i;
    }
    set() {
      throw new Error("set method is unimplemented");
    }
    get() {
      throw new Error("get method is unimplemented");
    }
    repeat(i = {}) {
      if (typeof i != "object")
        throw new TypeError("options must be an object");
      const { rows: s = 1, columns: r = 1 } = i;
      if (!Number.isInteger(s) || s <= 0)
        throw new TypeError("rows must be a positive integer");
      if (!Number.isInteger(r) || r <= 0)
        throw new TypeError("columns must be a positive integer");
      let o = new Q(this.rows * s, this.columns * r);
      for (let u = 0; u < s; u++)
        for (let b = 0; b < r; b++)
          o.setSubMatrix(this, this.rows * u, this.columns * b);
      return o;
    }
    fill(i) {
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, i);
      return this;
    }
    neg() {
      return this.mulS(-1);
    }
    getRow(i) {
      v(this, i);
      let s = [];
      for (let r = 0; r < this.columns; r++)
        s.push(this.get(i, r));
      return s;
    }
    getRowVector(i) {
      return Q.rowVector(this.getRow(i));
    }
    setRow(i, s) {
      v(this, i), s = x(this, s);
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, s[r]);
      return this;
    }
    swapRows(i, s) {
      v(this, i), v(this, s);
      for (let r = 0; r < this.columns; r++) {
        let o = this.get(i, r);
        this.set(i, r, this.get(s, r)), this.set(s, r, o);
      }
      return this;
    }
    getColumn(i) {
      m(this, i);
      let s = [];
      for (let r = 0; r < this.rows; r++)
        s.push(this.get(r, i));
      return s;
    }
    getColumnVector(i) {
      return Q.columnVector(this.getColumn(i));
    }
    setColumn(i, s) {
      m(this, i), s = R(this, s);
      for (let r = 0; r < this.rows; r++)
        this.set(r, i, s[r]);
      return this;
    }
    swapColumns(i, s) {
      m(this, i), m(this, s);
      for (let r = 0; r < this.rows; r++) {
        let o = this.get(r, i);
        this.set(r, i, this.get(r, s)), this.set(r, s, o);
      }
      return this;
    }
    addRowVector(i) {
      i = x(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) + i[r]);
      return this;
    }
    subRowVector(i) {
      i = x(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) - i[r]);
      return this;
    }
    mulRowVector(i) {
      i = x(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) * i[r]);
      return this;
    }
    divRowVector(i) {
      i = x(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) / i[r]);
      return this;
    }
    addColumnVector(i) {
      i = R(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) + i[s]);
      return this;
    }
    subColumnVector(i) {
      i = R(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) - i[s]);
      return this;
    }
    mulColumnVector(i) {
      i = R(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) * i[s]);
      return this;
    }
    divColumnVector(i) {
      i = R(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) / i[s]);
      return this;
    }
    mulRow(i, s) {
      v(this, i);
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, this.get(i, r) * s);
      return this;
    }
    mulColumn(i, s) {
      m(this, i);
      for (let r = 0; r < this.rows; r++)
        this.set(r, i, this.get(r, i) * s);
      return this;
    }
    max(i) {
      if (this.isEmpty())
        return NaN;
      switch (i) {
        case "row": {
          const s = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) > s[r] && (s[r] = this.get(r, o));
          return s;
        }
        case "column": {
          const s = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) > s[o] && (s[o] = this.get(r, o));
          return s;
        }
        case void 0: {
          let s = this.get(0, 0);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) > s && (s = this.get(r, o));
          return s;
        }
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    maxIndex() {
      q(this);
      let i = this.get(0, 0), s = [0, 0];
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.get(r, o) > i && (i = this.get(r, o), s[0] = r, s[1] = o);
      return s;
    }
    min(i) {
      if (this.isEmpty())
        return NaN;
      switch (i) {
        case "row": {
          const s = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) < s[r] && (s[r] = this.get(r, o));
          return s;
        }
        case "column": {
          const s = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) < s[o] && (s[o] = this.get(r, o));
          return s;
        }
        case void 0: {
          let s = this.get(0, 0);
          for (let r = 0; r < this.rows; r++)
            for (let o = 0; o < this.columns; o++)
              this.get(r, o) < s && (s = this.get(r, o));
          return s;
        }
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    minIndex() {
      q(this);
      let i = this.get(0, 0), s = [0, 0];
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.get(r, o) < i && (i = this.get(r, o), s[0] = r, s[1] = o);
      return s;
    }
    maxRow(i) {
      if (v(this, i), this.isEmpty())
        return NaN;
      let s = this.get(i, 0);
      for (let r = 1; r < this.columns; r++)
        this.get(i, r) > s && (s = this.get(i, r));
      return s;
    }
    maxRowIndex(i) {
      v(this, i), q(this);
      let s = this.get(i, 0), r = [i, 0];
      for (let o = 1; o < this.columns; o++)
        this.get(i, o) > s && (s = this.get(i, o), r[1] = o);
      return r;
    }
    minRow(i) {
      if (v(this, i), this.isEmpty())
        return NaN;
      let s = this.get(i, 0);
      for (let r = 1; r < this.columns; r++)
        this.get(i, r) < s && (s = this.get(i, r));
      return s;
    }
    minRowIndex(i) {
      v(this, i), q(this);
      let s = this.get(i, 0), r = [i, 0];
      for (let o = 1; o < this.columns; o++)
        this.get(i, o) < s && (s = this.get(i, o), r[1] = o);
      return r;
    }
    maxColumn(i) {
      if (m(this, i), this.isEmpty())
        return NaN;
      let s = this.get(0, i);
      for (let r = 1; r < this.rows; r++)
        this.get(r, i) > s && (s = this.get(r, i));
      return s;
    }
    maxColumnIndex(i) {
      m(this, i), q(this);
      let s = this.get(0, i), r = [0, i];
      for (let o = 1; o < this.rows; o++)
        this.get(o, i) > s && (s = this.get(o, i), r[0] = o);
      return r;
    }
    minColumn(i) {
      if (m(this, i), this.isEmpty())
        return NaN;
      let s = this.get(0, i);
      for (let r = 1; r < this.rows; r++)
        this.get(r, i) < s && (s = this.get(r, i));
      return s;
    }
    minColumnIndex(i) {
      m(this, i), q(this);
      let s = this.get(0, i), r = [0, i];
      for (let o = 1; o < this.rows; o++)
        this.get(o, i) < s && (s = this.get(o, i), r[0] = o);
      return r;
    }
    diag() {
      let i = Math.min(this.rows, this.columns), s = [];
      for (let r = 0; r < i; r++)
        s.push(this.get(r, r));
      return s;
    }
    norm(i = "frobenius") {
      switch (i) {
        case "max":
          return this.max();
        case "frobenius":
          return Math.sqrt(this.dot(this));
        default:
          throw new RangeError(`unknown norm type: ${i}`);
      }
    }
    cumulativeSum() {
      let i = 0;
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          i += this.get(s, r), this.set(s, r, i);
      return this;
    }
    dot(i) {
      ne.isMatrix(i) && (i = i.to1DArray());
      let s = this.to1DArray();
      if (s.length !== i.length)
        throw new RangeError("vectors do not have the same size");
      let r = 0;
      for (let o = 0; o < s.length; o++)
        r += s[o] * i[o];
      return r;
    }
    mmul(i) {
      i = Q.checkMatrix(i);
      let s = this.rows, r = this.columns, o = i.columns, u = new Q(s, o), b = new Float64Array(r);
      for (let _ = 0; _ < o; _++) {
        for (let S = 0; S < r; S++)
          b[S] = i.get(S, _);
        for (let S = 0; S < s; S++) {
          let k = 0;
          for (let $ = 0; $ < r; $++)
            k += this.get(S, $) * b[$];
          u.set(S, _, k);
        }
      }
      return u;
    }
    mpow(i) {
      if (!this.isSquare())
        throw new RangeError("Matrix must be square");
      if (!Number.isInteger(i) || i < 0)
        throw new RangeError("Exponent must be a non-negative integer");
      let s = Q.eye(this.rows), r = this;
      for (let o = i; o >= 1; o /= 2)
        (o & 1) !== 0 && (s = s.mmul(r)), r = r.mmul(r);
      return s;
    }
    strassen2x2(i) {
      i = Q.checkMatrix(i);
      let s = new Q(2, 2);
      const r = this.get(0, 0), o = i.get(0, 0), u = this.get(0, 1), b = i.get(0, 1), _ = this.get(1, 0), S = i.get(1, 0), k = this.get(1, 1), $ = i.get(1, 1), T = (r + k) * (o + $), G = (_ + k) * o, J = r * (b - $), j = k * (S - o), U = (r + u) * $, te = (_ - r) * (o + b), C = (u - k) * (S + $), Y = T + j - U + C, se = J + U, ge = G + j, me = T - G + J + te;
      return s.set(0, 0, Y), s.set(0, 1, se), s.set(1, 0, ge), s.set(1, 1, me), s;
    }
    strassen3x3(i) {
      i = Q.checkMatrix(i);
      let s = new Q(3, 3);
      const r = this.get(0, 0), o = this.get(0, 1), u = this.get(0, 2), b = this.get(1, 0), _ = this.get(1, 1), S = this.get(1, 2), k = this.get(2, 0), $ = this.get(2, 1), T = this.get(2, 2), G = i.get(0, 0), J = i.get(0, 1), j = i.get(0, 2), U = i.get(1, 0), te = i.get(1, 1), C = i.get(1, 2), Y = i.get(2, 0), se = i.get(2, 1), ge = i.get(2, 2), me = (r + o + u - b - _ - $ - T) * te, Le = (r - b) * (-J + te), y = _ * (-G + J + U - te - C - Y + ge), E = (-r + b + _) * (G - J + te), L = (b + _) * (-G + J), w = r * G, N = (-r + k + $) * (G - j + C), O = (-r + k) * (j - C), B = (k + $) * (-G + j), pe = (r + o + u - _ - S - k - $) * C, ae = $ * (-G + j + U - te - C - Y + se), Se = (-u + $ + T) * (te + Y - se), Te = (u - T) * (te - se), Ie = u * Y, ot = ($ + T) * (-Y + se), Oe = (-u + _ + S) * (C + Y - ge), dt = (u - S) * (C - ge), vt = (_ + S) * (-Y + ge), be = o * U, Fe = S * se, Ke = b * j, He = k * J, Ae = T * ge, as = w + Ie + be, us = me + E + L + w + Se + Ie + ot, hs = w + N + B + pe + Ie + Oe + vt, cs = Le + y + E + w + Ie + Oe + dt, fs = Le + E + L + w + Fe, ds = Ie + Oe + dt + vt + Ke, gs = w + N + O + ae + Se + Te + Ie, ps = Se + Te + Ie + ot + He, ms = w + N + O + B + Ae;
      return s.set(0, 0, as), s.set(0, 1, us), s.set(0, 2, hs), s.set(1, 0, cs), s.set(1, 1, fs), s.set(1, 2, ds), s.set(2, 0, gs), s.set(2, 1, ps), s.set(2, 2, ms), s;
    }
    mmulStrassen(i) {
      i = Q.checkMatrix(i);
      let s = this.clone(), r = s.rows, o = s.columns, u = i.rows, b = i.columns;
      o !== u && console.warn(
        `Multiplying ${r} x ${o} and ${u} x ${b} matrix: dimensions do not match.`
      );
      function _(T, G, J) {
        let j = T.rows, U = T.columns;
        if (j === G && U === J)
          return T;
        {
          let te = ne.zeros(G, J);
          return te = te.setSubMatrix(T, 0, 0), te;
        }
      }
      let S = Math.max(r, u), k = Math.max(o, b);
      s = _(s, S, k), i = _(i, S, k);
      function $(T, G, J, j) {
        if (J <= 512 || j <= 512)
          return T.mmul(G);
        J % 2 === 1 && j % 2 === 1 ? (T = _(T, J + 1, j + 1), G = _(G, J + 1, j + 1)) : J % 2 === 1 ? (T = _(T, J + 1, j), G = _(G, J + 1, j)) : j % 2 === 1 && (T = _(T, J, j + 1), G = _(G, J, j + 1));
        let U = parseInt(T.rows / 2, 10), te = parseInt(T.columns / 2, 10), C = T.subMatrix(0, U - 1, 0, te - 1), Y = G.subMatrix(0, U - 1, 0, te - 1), se = T.subMatrix(0, U - 1, te, T.columns - 1), ge = G.subMatrix(0, U - 1, te, G.columns - 1), me = T.subMatrix(U, T.rows - 1, 0, te - 1), Le = G.subMatrix(U, G.rows - 1, 0, te - 1), y = T.subMatrix(U, T.rows - 1, te, T.columns - 1), E = G.subMatrix(U, G.rows - 1, te, G.columns - 1), L = $(
          ne.add(C, y),
          ne.add(Y, E),
          U,
          te
        ), w = $(ne.add(me, y), Y, U, te), N = $(C, ne.sub(ge, E), U, te), O = $(y, ne.sub(Le, Y), U, te), B = $(ne.add(C, se), E, U, te), pe = $(
          ne.sub(me, C),
          ne.add(Y, ge),
          U,
          te
        ), ae = $(
          ne.sub(se, y),
          ne.add(Le, E),
          U,
          te
        ), Se = ne.add(L, O);
        Se.sub(B), Se.add(ae);
        let Te = ne.add(N, B), Ie = ne.add(w, O), ot = ne.sub(L, w);
        ot.add(N), ot.add(pe);
        let Oe = ne.zeros(2 * Se.rows, 2 * Se.columns);
        return Oe = Oe.setSubMatrix(Se, 0, 0), Oe = Oe.setSubMatrix(Te, Se.rows, 0), Oe = Oe.setSubMatrix(Ie, 0, Se.columns), Oe = Oe.setSubMatrix(ot, Se.rows, Se.columns), Oe.subMatrix(0, J - 1, 0, j - 1);
      }
      return $(s, i, S, k);
    }
    scaleRows(i = {}) {
      if (typeof i != "object")
        throw new TypeError("options must be an object");
      const { min: s = 0, max: r = 1 } = i;
      if (!Number.isFinite(s)) throw new TypeError("min must be a number");
      if (!Number.isFinite(r)) throw new TypeError("max must be a number");
      if (s >= r) throw new RangeError("min must be smaller than max");
      let o = new Q(this.rows, this.columns);
      for (let u = 0; u < this.rows; u++) {
        const b = this.getRow(u);
        b.length > 0 && t(b, { min: s, max: r, output: b }), o.setRow(u, b);
      }
      return o;
    }
    scaleColumns(i = {}) {
      if (typeof i != "object")
        throw new TypeError("options must be an object");
      const { min: s = 0, max: r = 1 } = i;
      if (!Number.isFinite(s)) throw new TypeError("min must be a number");
      if (!Number.isFinite(r)) throw new TypeError("max must be a number");
      if (s >= r) throw new RangeError("min must be smaller than max");
      let o = new Q(this.rows, this.columns);
      for (let u = 0; u < this.columns; u++) {
        const b = this.getColumn(u);
        b.length && t(b, {
          min: s,
          max: r,
          output: b
        }), o.setColumn(u, b);
      }
      return o;
    }
    flipRows() {
      const i = Math.ceil(this.columns / 2);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < i; r++) {
          let o = this.get(s, r), u = this.get(s, this.columns - 1 - r);
          this.set(s, r, u), this.set(s, this.columns - 1 - r, o);
        }
      return this;
    }
    flipColumns() {
      const i = Math.ceil(this.rows / 2);
      for (let s = 0; s < this.columns; s++)
        for (let r = 0; r < i; r++) {
          let o = this.get(r, s), u = this.get(this.rows - 1 - r, s);
          this.set(r, s, u), this.set(this.rows - 1 - r, s, o);
        }
      return this;
    }
    kroneckerProduct(i) {
      i = Q.checkMatrix(i);
      let s = this.rows, r = this.columns, o = i.rows, u = i.columns, b = new Q(s * o, r * u);
      for (let _ = 0; _ < s; _++)
        for (let S = 0; S < r; S++)
          for (let k = 0; k < o; k++)
            for (let $ = 0; $ < u; $++)
              b.set(o * _ + k, u * S + $, this.get(_, S) * i.get(k, $));
      return b;
    }
    kroneckerSum(i) {
      if (i = Q.checkMatrix(i), !this.isSquare() || !i.isSquare())
        throw new Error("Kronecker Sum needs two Square Matrices");
      let s = this.rows, r = i.rows, o = this.kroneckerProduct(Q.eye(r, r)), u = Q.eye(s, s).kroneckerProduct(i);
      return o.add(u);
    }
    transpose() {
      let i = new Q(this.columns, this.rows);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          i.set(r, s, this.get(s, r));
      return i;
    }
    sortRows(i = Ce) {
      for (let s = 0; s < this.rows; s++)
        this.setRow(s, this.getRow(s).sort(i));
      return this;
    }
    sortColumns(i = Ce) {
      for (let s = 0; s < this.columns; s++)
        this.setColumn(s, this.getColumn(s).sort(i));
      return this;
    }
    subMatrix(i, s, r, o) {
      A(this, i, s, r, o);
      let u = new Q(
        s - i + 1,
        o - r + 1
      );
      for (let b = i; b <= s; b++)
        for (let _ = r; _ <= o; _++)
          u.set(b - i, _ - r, this.get(b, _));
      return u;
    }
    subMatrixRow(i, s, r) {
      if (s === void 0 && (s = 0), r === void 0 && (r = this.columns - 1), s > r || s < 0 || s >= this.columns || r < 0 || r >= this.columns)
        throw new RangeError("Argument out of range");
      let o = new Q(i.length, r - s + 1);
      for (let u = 0; u < i.length; u++)
        for (let b = s; b <= r; b++) {
          if (i[u] < 0 || i[u] >= this.rows)
            throw new RangeError(`Row index out of range: ${i[u]}`);
          o.set(u, b - s, this.get(i[u], b));
        }
      return o;
    }
    subMatrixColumn(i, s, r) {
      if (s === void 0 && (s = 0), r === void 0 && (r = this.rows - 1), s > r || s < 0 || s >= this.rows || r < 0 || r >= this.rows)
        throw new RangeError("Argument out of range");
      let o = new Q(r - s + 1, i.length);
      for (let u = 0; u < i.length; u++)
        for (let b = s; b <= r; b++) {
          if (i[u] < 0 || i[u] >= this.columns)
            throw new RangeError(`Column index out of range: ${i[u]}`);
          o.set(b - s, u, this.get(b, i[u]));
        }
      return o;
    }
    setSubMatrix(i, s, r) {
      if (i = Q.checkMatrix(i), i.isEmpty())
        return this;
      let o = s + i.rows - 1, u = r + i.columns - 1;
      A(this, s, o, r, u);
      for (let b = 0; b < i.rows; b++)
        for (let _ = 0; _ < i.columns; _++)
          this.set(s + b, r + _, i.get(b, _));
      return this;
    }
    selection(i, s) {
      P(this, i), F(this, s);
      let r = new Q(i.length, s.length);
      for (let o = 0; o < i.length; o++) {
        let u = i[o];
        for (let b = 0; b < s.length; b++) {
          let _ = s[b];
          r.set(o, b, this.get(u, _));
        }
      }
      return r;
    }
    trace() {
      let i = Math.min(this.rows, this.columns), s = 0;
      for (let r = 0; r < i; r++)
        s += this.get(r, r);
      return s;
    }
    clone() {
      return this.constructor.copy(this, new Q(this.rows, this.columns));
    }
    /**
     * @template {AbstractMatrix} M
     * @param {AbstractMatrix} from
     * @param {M} to
     * @return {M}
     */
    static copy(i, s) {
      for (const [r, o, u] of i.entries())
        s.set(r, o, u);
      return s;
    }
    sum(i) {
      switch (i) {
        case "row":
          return I(this);
        case "column":
          return V(this);
        case void 0:
          return K(this);
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    product(i) {
      switch (i) {
        case "row":
          return ee(this);
        case "column":
          return le(this);
        case void 0:
          return de(this);
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    mean(i) {
      const s = this.sum(i);
      switch (i) {
        case "row": {
          for (let r = 0; r < this.rows; r++)
            s[r] /= this.columns;
          return s;
        }
        case "column": {
          for (let r = 0; r < this.columns; r++)
            s[r] /= this.rows;
          return s;
        }
        case void 0:
          return s / this.size;
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    variance(i, s = {}) {
      if (typeof i == "object" && (s = i, i = void 0), typeof s != "object")
        throw new TypeError("options must be an object");
      const { unbiased: r = !0, mean: o = this.mean(i) } = s;
      if (typeof r != "boolean")
        throw new TypeError("unbiased must be a boolean");
      switch (i) {
        case "row": {
          if (!e.isAnyArray(o))
            throw new TypeError("mean must be an array");
          return H(this, r, o);
        }
        case "column": {
          if (!e.isAnyArray(o))
            throw new TypeError("mean must be an array");
          return ce(this, r, o);
        }
        case void 0: {
          if (typeof o != "number")
            throw new TypeError("mean must be a number");
          return ve(this, r, o);
        }
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    standardDeviation(i, s) {
      typeof i == "object" && (s = i, i = void 0);
      const r = this.variance(i, s);
      if (i === void 0)
        return Math.sqrt(r);
      for (let o = 0; o < r.length; o++)
        r[o] = Math.sqrt(r[o]);
      return r;
    }
    center(i, s = {}) {
      if (typeof i == "object" && (s = i, i = void 0), typeof s != "object")
        throw new TypeError("options must be an object");
      const { center: r = this.mean(i) } = s;
      switch (i) {
        case "row": {
          if (!e.isAnyArray(r))
            throw new TypeError("center must be an array");
          return re(this, r), this;
        }
        case "column": {
          if (!e.isAnyArray(r))
            throw new TypeError("center must be an array");
          return z(this, r), this;
        }
        case void 0: {
          if (typeof r != "number")
            throw new TypeError("center must be a number");
          return Z(this, r), this;
        }
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    scale(i, s = {}) {
      if (typeof i == "object" && (s = i, i = void 0), typeof s != "object")
        throw new TypeError("options must be an object");
      let r = s.scale;
      switch (i) {
        case "row": {
          if (r === void 0)
            r = W(this);
          else if (!e.isAnyArray(r))
            throw new TypeError("scale must be an array");
          return ie(this, r), this;
        }
        case "column": {
          if (r === void 0)
            r = oe(this);
          else if (!e.isAnyArray(r))
            throw new TypeError("scale must be an array");
          return he(this, r), this;
        }
        case void 0: {
          if (r === void 0)
            r = fe(this);
          else if (typeof r != "number")
            throw new TypeError("scale must be a number");
          return we(this, r), this;
        }
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    toString(i) {
      return h(this, i);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    /**
     * iterator from left to right, from top to bottom
     * yield [row, column, value]
     * @returns {Generator<[number, number, number], void, void>}
     */
    *entries() {
      for (let i = 0; i < this.rows; i++)
        for (let s = 0; s < this.columns; s++)
          yield [i, s, this.get(i, s)];
    }
    /**
     * iterator from left to right, from top to bottom
     * yield value
     * @returns {Generator<number, void, void>}
     */
    *values() {
      for (let i = 0; i < this.rows; i++)
        for (let s = 0; s < this.columns; s++)
          yield this.get(i, s);
    }
  }
  ne.prototype.klass = "Matrix", typeof Symbol < "u" && (ne.prototype[Symbol.for("nodejs.util.inspect.custom")] = a);
  function Ce(d, i) {
    return d - i;
  }
  function ke(d) {
    return d.every((i) => typeof i == "number");
  }
  ne.random = ne.rand, ne.randomInt = ne.randInt, ne.diagonal = ne.diag, ne.prototype.diagonal = ne.prototype.diag, ne.identity = ne.eye, ne.prototype.negate = ne.prototype.neg, ne.prototype.tensorProduct = ne.prototype.kroneckerProduct;
  class Q extends ne {
    /**
     * @type {Float64Array[]}
     */
    data;
    /**
     * Init an empty matrix
     * @param {number} nRows
     * @param {number} nColumns
     */
    #e(i, s) {
      if (this.data = [], Number.isInteger(s) && s >= 0)
        for (let r = 0; r < i; r++)
          this.data.push(new Float64Array(s));
      else
        throw new TypeError("nColumns must be a positive integer");
      this.rows = i, this.columns = s;
    }
    constructor(i, s) {
      if (super(), Q.isMatrix(i))
        this.#e(i.rows, i.columns), Q.copy(i, this);
      else if (Number.isInteger(i) && i >= 0)
        this.#e(i, s);
      else if (e.isAnyArray(i)) {
        const r = i;
        if (i = r.length, s = i ? r[0].length : 0, typeof s != "number")
          throw new TypeError(
            "Data must be a 2D array with at least one element"
          );
        this.data = [];
        for (let o = 0; o < i; o++) {
          if (r[o].length !== s)
            throw new RangeError("Inconsistent array dimensions");
          if (!ke(r[o]))
            throw new TypeError("Input data contains non-numeric values");
          this.data.push(Float64Array.from(r[o]));
        }
        this.rows = i, this.columns = s;
      } else
        throw new TypeError(
          "First argument must be a positive number or an array"
        );
    }
    set(i, s, r) {
      return this.data[i][s] = r, this;
    }
    get(i, s) {
      return this.data[i][s];
    }
    removeRow(i) {
      return v(this, i), this.data.splice(i, 1), this.rows -= 1, this;
    }
    addRow(i, s) {
      return s === void 0 && (s = i, i = this.rows), v(this, i, !0), s = Float64Array.from(x(this, s)), this.data.splice(i, 0, s), this.rows += 1, this;
    }
    removeColumn(i) {
      m(this, i);
      for (let s = 0; s < this.rows; s++) {
        const r = new Float64Array(this.columns - 1);
        for (let o = 0; o < i; o++)
          r[o] = this.data[s][o];
        for (let o = i + 1; o < this.columns; o++)
          r[o - 1] = this.data[s][o];
        this.data[s] = r;
      }
      return this.columns -= 1, this;
    }
    addColumn(i, s) {
      typeof s > "u" && (s = i, i = this.columns), m(this, i, !0), s = R(this, s);
      for (let r = 0; r < this.rows; r++) {
        const o = new Float64Array(this.columns + 1);
        let u = 0;
        for (; u < i; u++)
          o[u] = this.data[r][u];
        for (o[u++] = s[r]; u < this.columns + 1; u++)
          o[u] = this.data[r][u - 1];
        this.data[r] = o;
      }
      return this.columns += 1, this;
    }
  }
  g(ne, Q);
  class Ne extends ne {
    /** @type {Matrix} */
    #e;
    get size() {
      return this.#e.size;
    }
    get rows() {
      return this.#e.rows;
    }
    get columns() {
      return this.#e.columns;
    }
    get diagonalSize() {
      return this.rows;
    }
    /**
     * not the same as matrix.isSymmetric()
     * Here is to check if it's instanceof SymmetricMatrix without bundling issues
     *
     * @param value
     * @returns {boolean}
     */
    static isSymmetricMatrix(i) {
      return Q.isMatrix(i) && i.klassType === "SymmetricMatrix";
    }
    /**
     * @param diagonalSize
     * @return {SymmetricMatrix}
     */
    static zeros(i) {
      return new this(i);
    }
    /**
     * @param diagonalSize
     * @return {SymmetricMatrix}
     */
    static ones(i) {
      return new this(i).fill(1);
    }
    /**
     * @param {number | AbstractMatrix | ArrayLike<ArrayLike<number>>} diagonalSize
     * @return {this}
     */
    constructor(i) {
      if (super(), Q.isMatrix(i)) {
        if (!i.isSymmetric())
          throw new TypeError("not symmetric data");
        this.#e = Q.copy(
          i,
          new Q(i.rows, i.rows)
        );
      } else if (Number.isInteger(i) && i >= 0)
        this.#e = new Q(i, i);
      else if (this.#e = new Q(i), !this.isSymmetric())
        throw new TypeError("not symmetric data");
    }
    clone() {
      const i = new Ne(this.diagonalSize);
      for (const [s, r, o] of this.upperRightEntries())
        i.set(s, r, o);
      return i;
    }
    toMatrix() {
      return new Q(this);
    }
    get(i, s) {
      return this.#e.get(i, s);
    }
    set(i, s, r) {
      return this.#e.set(i, s, r), this.#e.set(s, i, r), this;
    }
    removeCross(i) {
      return this.#e.removeRow(i), this.#e.removeColumn(i), this;
    }
    addCross(i, s) {
      s === void 0 && (s = i, i = this.diagonalSize);
      const r = s.slice();
      return r.splice(i, 1), this.#e.addRow(i, r), this.#e.addColumn(i, s), this;
    }
    /**
     * @param {Mask[]} mask
     */
    applyMask(i) {
      if (i.length !== this.diagonalSize)
        throw new RangeError("Mask size do not match with matrix size");
      const s = [];
      for (const [r, o] of i.entries())
        o || s.push(r);
      s.reverse();
      for (const r of s)
        this.removeCross(r);
      return this;
    }
    /**
     * Compact format upper-right corner of matrix
     * iterate from left to right, from top to bottom.
     *
     * ```
     *   A B C D
     * A 1 2 3 4
     * B 2 5 6 7
     * C 3 6 8 9
     * D 4 7 9 10
     * ```
     *
     * will return compact 1D array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
     *
     * length is S(i=0, n=sideSize) => 10 for a 4 sideSized matrix
     *
     * @returns {number[]}
     */
    toCompact() {
      const { diagonalSize: i } = this, s = new Array(i * (i + 1) / 2);
      for (let r = 0, o = 0, u = 0; u < s.length; u++)
        s[u] = this.get(o, r), ++r >= i && (r = ++o);
      return s;
    }
    /**
     * @param {number[]} compact
     * @return {SymmetricMatrix}
     */
    static fromCompact(i) {
      const s = i.length, r = (Math.sqrt(8 * s + 1) - 1) / 2;
      if (!Number.isInteger(r))
        throw new TypeError(
          `This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(
            i
          )}`
        );
      const o = new Ne(r);
      for (let u = 0, b = 0, _ = 0; _ < s; _++)
        o.set(u, b, i[_]), ++u >= r && (u = ++b);
      return o;
    }
    /**
     * half iterator upper-right-corner from left to right, from top to bottom
     * yield [row, column, value]
     *
     * @returns {Generator<[number, number, number], void, void>}
     */
    *upperRightEntries() {
      for (let i = 0, s = 0; i < this.diagonalSize; void 0) {
        const r = this.get(i, s);
        yield [i, s, r], ++s >= this.diagonalSize && (s = ++i);
      }
    }
    /**
     * half iterator upper-right-corner from left to right, from top to bottom
     * yield value
     *
     * @returns {Generator<[number, number, number], void, void>}
     */
    *upperRightValues() {
      for (let i = 0, s = 0; i < this.diagonalSize; void 0)
        yield this.get(i, s), ++s >= this.diagonalSize && (s = ++i);
    }
  }
  Ne.prototype.klassType = "SymmetricMatrix";
  class Re extends Ne {
    /**
     * not the same as matrix.isSymmetric()
     * Here is to check if it's instanceof SymmetricMatrix without bundling issues
     *
     * @param value
     * @returns {boolean}
     */
    static isDistanceMatrix(i) {
      return Ne.isSymmetricMatrix(i) && i.klassSubType === "DistanceMatrix";
    }
    constructor(i) {
      if (super(i), !this.isDistance())
        throw new TypeError("Provided arguments do no produce a distance matrix");
    }
    set(i, s, r) {
      return i === s && (r = 0), super.set(i, s, r);
    }
    addCross(i, s) {
      return s === void 0 && (s = i, i = this.diagonalSize), s = s.slice(), s[i] = 0, super.addCross(i, s);
    }
    toSymmetricMatrix() {
      return new Ne(this);
    }
    clone() {
      const i = new Re(this.diagonalSize);
      for (const [s, r, o] of this.upperRightEntries())
        s !== r && i.set(s, r, o);
      return i;
    }
    /**
     * Compact format upper-right corner of matrix
     * no diagonal (only zeros)
     * iterable from left to right, from top to bottom.
     *
     * ```
     *   A B C D
     * A 0 1 2 3
     * B 1 0 4 5
     * C 2 4 0 6
     * D 3 5 6 0
     * ```
     *
     * will return compact 1D array `[1, 2, 3, 4, 5, 6]`
     *
     * length is S(i=0, n=sideSize-1) => 6 for a 4 side sized matrix
     *
     * @returns {number[]}
     */
    toCompact() {
      const { diagonalSize: i } = this, s = (i - 1) * i / 2, r = new Array(s);
      for (let o = 1, u = 0, b = 0; b < r.length; b++)
        r[b] = this.get(u, o), ++o >= i && (o = ++u + 1);
      return r;
    }
    /**
     * @param {number[]} compact
     */
    static fromCompact(i) {
      const s = i.length;
      if (s === 0)
        return new this(0);
      const r = (Math.sqrt(8 * s + 1) + 1) / 2;
      if (!Number.isInteger(r))
        throw new TypeError(
          `This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(
            i
          )}`
        );
      const o = new this(r);
      for (let u = 1, b = 0, _ = 0; _ < s; _++)
        o.set(u, b, i[_]), ++u >= r && (u = ++b + 1);
      return o;
    }
  }
  Re.prototype.klassSubType = "DistanceMatrix";
  class Ee extends ne {
    constructor(i, s, r) {
      super(), this.matrix = i, this.rows = s, this.columns = r;
    }
  }
  class Be extends Ee {
    constructor(i, s) {
      m(i, s), super(i, i.rows, 1), this.column = s;
    }
    set(i, s, r) {
      return this.matrix.set(i, this.column, r), this;
    }
    get(i) {
      return this.matrix.get(i, this.column);
    }
  }
  class yt extends Ee {
    constructor(i, s) {
      F(i, s), super(i, i.rows, s.length), this.columnIndices = s;
    }
    set(i, s, r) {
      return this.matrix.set(i, this.columnIndices[s], r), this;
    }
    get(i, s) {
      return this.matrix.get(i, this.columnIndices[s]);
    }
  }
  class ct extends Ee {
    constructor(i) {
      super(i, i.rows, i.columns);
    }
    set(i, s, r) {
      return this.matrix.set(i, this.columns - s - 1, r), this;
    }
    get(i, s) {
      return this.matrix.get(i, this.columns - s - 1);
    }
  }
  class Tt extends Ee {
    constructor(i) {
      super(i, i.rows, i.columns);
    }
    set(i, s, r) {
      return this.matrix.set(this.rows - i - 1, s, r), this;
    }
    get(i, s) {
      return this.matrix.get(this.rows - i - 1, s);
    }
  }
  class Rt extends Ee {
    constructor(i, s) {
      v(i, s), super(i, 1, i.columns), this.row = s;
    }
    set(i, s, r) {
      return this.matrix.set(this.row, s, r), this;
    }
    get(i, s) {
      return this.matrix.get(this.row, s);
    }
  }
  class wn extends Ee {
    constructor(i, s) {
      P(i, s), super(i, s.length, i.columns), this.rowIndices = s;
    }
    set(i, s, r) {
      return this.matrix.set(this.rowIndices[i], s, r), this;
    }
    get(i, s) {
      return this.matrix.get(this.rowIndices[i], s);
    }
  }
  class Ct extends Ee {
    constructor(i, s, r) {
      P(i, s), F(i, r), super(i, s.length, r.length), this.rowIndices = s, this.columnIndices = r;
    }
    set(i, s, r) {
      return this.matrix.set(
        this.rowIndices[i],
        this.columnIndices[s],
        r
      ), this;
    }
    get(i, s) {
      return this.matrix.get(
        this.rowIndices[i],
        this.columnIndices[s]
      );
    }
  }
  class yn extends Ee {
    constructor(i, s, r, o, u) {
      A(i, s, r, o, u), super(i, r - s + 1, u - o + 1), this.startRow = s, this.startColumn = o;
    }
    set(i, s, r) {
      return this.matrix.set(
        this.startRow + i,
        this.startColumn + s,
        r
      ), this;
    }
    get(i, s) {
      return this.matrix.get(
        this.startRow + i,
        this.startColumn + s
      );
    }
  }
  class vn extends Ee {
    constructor(i) {
      super(i, i.columns, i.rows);
    }
    set(i, s, r) {
      return this.matrix.set(s, i, r), this;
    }
    get(i, s) {
      return this.matrix.get(s, i);
    }
  }
  class Yt extends ne {
    constructor(i, s = {}) {
      const { rows: r = 1 } = s;
      if (i.length % r !== 0)
        throw new Error("the data length is not divisible by the number of rows");
      super(), this.rows = r, this.columns = i.length / r, this.data = i;
    }
    set(i, s, r) {
      let o = this._calculateIndex(i, s);
      return this.data[o] = r, this;
    }
    get(i, s) {
      let r = this._calculateIndex(i, s);
      return this.data[r];
    }
    _calculateIndex(i, s) {
      return i * this.columns + s;
    }
  }
  class De extends ne {
    constructor(i) {
      super(), this.data = i, this.rows = i.length, this.columns = i[0].length;
    }
    set(i, s, r) {
      return this.data[i][s] = r, this;
    }
    get(i, s) {
      return this.data[i][s];
    }
  }
  function Kn(d, i) {
    if (e.isAnyArray(d))
      return d[0] && e.isAnyArray(d[0]) ? new De(d) : new Yt(d, i);
    throw new Error("the argument is not an array");
  }
  class ze {
    constructor(i) {
      i = De.checkMatrix(i);
      let s = i.clone(), r = s.rows, o = s.columns, u = new Float64Array(r), b = 1, _, S, k, $, T, G, J, j, U;
      for (_ = 0; _ < r; _++)
        u[_] = _;
      for (j = new Float64Array(r), S = 0; S < o; S++) {
        for (_ = 0; _ < r; _++)
          j[_] = s.get(_, S);
        for (_ = 0; _ < r; _++) {
          for (U = Math.min(_, S), T = 0, k = 0; k < U; k++)
            T += s.get(_, k) * j[k];
          j[_] -= T, s.set(_, S, j[_]);
        }
        for ($ = S, _ = S + 1; _ < r; _++)
          Math.abs(j[_]) > Math.abs(j[$]) && ($ = _);
        if ($ !== S) {
          for (k = 0; k < o; k++)
            G = s.get($, k), s.set($, k, s.get(S, k)), s.set(S, k, G);
          J = u[$], u[$] = u[S], u[S] = J, b = -b;
        }
        if (S < r && s.get(S, S) !== 0)
          for (_ = S + 1; _ < r; _++)
            s.set(_, S, s.get(_, S) / s.get(S, S));
      }
      this.LU = s, this.pivotVector = u, this.pivotSign = b;
    }
    isSingular() {
      let i = this.LU, s = i.columns;
      for (let r = 0; r < s; r++)
        if (i.get(r, r) === 0)
          return !0;
      return !1;
    }
    solve(i) {
      i = Q.checkMatrix(i);
      let s = this.LU;
      if (s.rows !== i.rows)
        throw new Error("Invalid matrix dimensions");
      if (this.isSingular())
        throw new Error("LU matrix is singular");
      let o = i.columns, u = i.subMatrixRow(this.pivotVector, 0, o - 1), b = s.columns, _, S, k;
      for (k = 0; k < b; k++)
        for (_ = k + 1; _ < b; _++)
          for (S = 0; S < o; S++)
            u.set(_, S, u.get(_, S) - u.get(k, S) * s.get(_, k));
      for (k = b - 1; k >= 0; k--) {
        for (S = 0; S < o; S++)
          u.set(k, S, u.get(k, S) / s.get(k, k));
        for (_ = 0; _ < k; _++)
          for (S = 0; S < o; S++)
            u.set(_, S, u.get(_, S) - u.get(k, S) * s.get(_, k));
      }
      return u;
    }
    get determinant() {
      let i = this.LU;
      if (!i.isSquare())
        throw new Error("Matrix must be square");
      let s = this.pivotSign, r = i.columns;
      for (let o = 0; o < r; o++)
        s *= i.get(o, o);
      return s;
    }
    get lowerTriangularMatrix() {
      let i = this.LU, s = i.rows, r = i.columns, o = new Q(s, r);
      for (let u = 0; u < s; u++)
        for (let b = 0; b < r; b++)
          u > b ? o.set(u, b, i.get(u, b)) : u === b ? o.set(u, b, 1) : o.set(u, b, 0);
      return o;
    }
    get upperTriangularMatrix() {
      let i = this.LU, s = i.rows, r = i.columns, o = new Q(s, r);
      for (let u = 0; u < s; u++)
        for (let b = 0; b < r; b++)
          u <= b ? o.set(u, b, i.get(u, b)) : o.set(u, b, 0);
      return o;
    }
    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }
  }
  function st(d, i) {
    let s = 0;
    return Math.abs(d) > Math.abs(i) ? (s = i / d, Math.abs(d) * Math.sqrt(1 + s * s)) : i !== 0 ? (s = d / i, Math.abs(i) * Math.sqrt(1 + s * s)) : 0;
  }
  class It {
    constructor(i) {
      i = De.checkMatrix(i);
      let s = i.clone(), r = i.rows, o = i.columns, u = new Float64Array(o), b, _, S, k;
      for (S = 0; S < o; S++) {
        let $ = 0;
        for (b = S; b < r; b++)
          $ = st($, s.get(b, S));
        if ($ !== 0) {
          for (s.get(S, S) < 0 && ($ = -$), b = S; b < r; b++)
            s.set(b, S, s.get(b, S) / $);
          for (s.set(S, S, s.get(S, S) + 1), _ = S + 1; _ < o; _++) {
            for (k = 0, b = S; b < r; b++)
              k += s.get(b, S) * s.get(b, _);
            for (k = -k / s.get(S, S), b = S; b < r; b++)
              s.set(b, _, s.get(b, _) + k * s.get(b, S));
          }
        }
        u[S] = -$;
      }
      this.QR = s, this.Rdiag = u;
    }
    solve(i) {
      i = Q.checkMatrix(i);
      let s = this.QR, r = s.rows;
      if (i.rows !== r)
        throw new Error("Matrix row dimensions must agree");
      if (!this.isFullRank())
        throw new Error("Matrix is rank deficient");
      let o = i.columns, u = i.clone(), b = s.columns, _, S, k, $;
      for (k = 0; k < b; k++)
        for (S = 0; S < o; S++) {
          for ($ = 0, _ = k; _ < r; _++)
            $ += s.get(_, k) * u.get(_, S);
          for ($ = -$ / s.get(k, k), _ = k; _ < r; _++)
            u.set(_, S, u.get(_, S) + $ * s.get(_, k));
        }
      for (k = b - 1; k >= 0; k--) {
        for (S = 0; S < o; S++)
          u.set(k, S, u.get(k, S) / this.Rdiag[k]);
        for (_ = 0; _ < k; _++)
          for (S = 0; S < o; S++)
            u.set(_, S, u.get(_, S) - u.get(k, S) * s.get(_, k));
      }
      return u.subMatrix(0, b - 1, 0, o - 1);
    }
    isFullRank() {
      let i = this.QR.columns;
      for (let s = 0; s < i; s++)
        if (this.Rdiag[s] === 0)
          return !1;
      return !0;
    }
    get upperTriangularMatrix() {
      let i = this.QR, s = i.columns, r = new Q(s, s), o, u;
      for (o = 0; o < s; o++)
        for (u = 0; u < s; u++)
          o < u ? r.set(o, u, i.get(o, u)) : o === u ? r.set(o, u, this.Rdiag[o]) : r.set(o, u, 0);
      return r;
    }
    get orthogonalMatrix() {
      let i = this.QR, s = i.rows, r = i.columns, o = new Q(s, r), u, b, _, S;
      for (_ = r - 1; _ >= 0; _--) {
        for (u = 0; u < s; u++)
          o.set(u, _, 0);
        for (o.set(_, _, 1), b = _; b < r; b++)
          if (i.get(_, _) !== 0) {
            for (S = 0, u = _; u < s; u++)
              S += i.get(u, _) * o.get(u, b);
            for (S = -S / i.get(_, _), u = _; u < s; u++)
              o.set(u, b, o.get(u, b) + S * i.get(u, _));
          }
      }
      return o;
    }
  }
  class ft {
    constructor(i, s = {}) {
      if (i = De.checkMatrix(i), i.isEmpty())
        throw new Error("Matrix must be non-empty");
      let r = i.rows, o = i.columns;
      const {
        computeLeftSingularVectors: u = !0,
        computeRightSingularVectors: b = !0,
        autoTranspose: _ = !1
      } = s;
      let S = !!u, k = !!b, $ = !1, T;
      if (r < o)
        if (!_)
          T = i.clone(), console.warn(
            "Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose"
          );
        else {
          T = i.transpose(), r = T.rows, o = T.columns, $ = !0;
          let w = S;
          S = k, k = w;
        }
      else
        T = i.clone();
      let G = Math.min(r, o), J = Math.min(r + 1, o), j = new Float64Array(J), U = new Q(r, G), te = new Q(o, o), C = new Float64Array(o), Y = new Float64Array(r), se = new Float64Array(J);
      for (let w = 0; w < J; w++) se[w] = w;
      let ge = Math.min(r - 1, o), me = Math.max(0, Math.min(o - 2, r)), Le = Math.max(ge, me);
      for (let w = 0; w < Le; w++) {
        if (w < ge) {
          j[w] = 0;
          for (let N = w; N < r; N++)
            j[w] = st(j[w], T.get(N, w));
          if (j[w] !== 0) {
            T.get(w, w) < 0 && (j[w] = -j[w]);
            for (let N = w; N < r; N++)
              T.set(N, w, T.get(N, w) / j[w]);
            T.set(w, w, T.get(w, w) + 1);
          }
          j[w] = -j[w];
        }
        for (let N = w + 1; N < o; N++) {
          if (w < ge && j[w] !== 0) {
            let O = 0;
            for (let B = w; B < r; B++)
              O += T.get(B, w) * T.get(B, N);
            O = -O / T.get(w, w);
            for (let B = w; B < r; B++)
              T.set(B, N, T.get(B, N) + O * T.get(B, w));
          }
          C[N] = T.get(w, N);
        }
        if (S && w < ge)
          for (let N = w; N < r; N++)
            U.set(N, w, T.get(N, w));
        if (w < me) {
          C[w] = 0;
          for (let N = w + 1; N < o; N++)
            C[w] = st(C[w], C[N]);
          if (C[w] !== 0) {
            C[w + 1] < 0 && (C[w] = 0 - C[w]);
            for (let N = w + 1; N < o; N++)
              C[N] /= C[w];
            C[w + 1] += 1;
          }
          if (C[w] = -C[w], w + 1 < r && C[w] !== 0) {
            for (let N = w + 1; N < r; N++)
              Y[N] = 0;
            for (let N = w + 1; N < r; N++)
              for (let O = w + 1; O < o; O++)
                Y[N] += C[O] * T.get(N, O);
            for (let N = w + 1; N < o; N++) {
              let O = -C[N] / C[w + 1];
              for (let B = w + 1; B < r; B++)
                T.set(B, N, T.get(B, N) + O * Y[B]);
            }
          }
          if (k)
            for (let N = w + 1; N < o; N++)
              te.set(N, w, C[N]);
        }
      }
      let y = Math.min(o, r + 1);
      if (ge < o && (j[ge] = T.get(ge, ge)), r < y && (j[y - 1] = 0), me + 1 < y && (C[me] = T.get(me, y - 1)), C[y - 1] = 0, S) {
        for (let w = ge; w < G; w++) {
          for (let N = 0; N < r; N++)
            U.set(N, w, 0);
          U.set(w, w, 1);
        }
        for (let w = ge - 1; w >= 0; w--)
          if (j[w] !== 0) {
            for (let N = w + 1; N < G; N++) {
              let O = 0;
              for (let B = w; B < r; B++)
                O += U.get(B, w) * U.get(B, N);
              O = -O / U.get(w, w);
              for (let B = w; B < r; B++)
                U.set(B, N, U.get(B, N) + O * U.get(B, w));
            }
            for (let N = w; N < r; N++)
              U.set(N, w, -U.get(N, w));
            U.set(w, w, 1 + U.get(w, w));
            for (let N = 0; N < w - 1; N++)
              U.set(N, w, 0);
          } else {
            for (let N = 0; N < r; N++)
              U.set(N, w, 0);
            U.set(w, w, 1);
          }
      }
      if (k)
        for (let w = o - 1; w >= 0; w--) {
          if (w < me && C[w] !== 0)
            for (let N = w + 1; N < o; N++) {
              let O = 0;
              for (let B = w + 1; B < o; B++)
                O += te.get(B, w) * te.get(B, N);
              O = -O / te.get(w + 1, w);
              for (let B = w + 1; B < o; B++)
                te.set(B, N, te.get(B, N) + O * te.get(B, w));
            }
          for (let N = 0; N < o; N++)
            te.set(N, w, 0);
          te.set(w, w, 1);
        }
      let E = y - 1, L = Number.EPSILON;
      for (; y > 0; ) {
        let w, N;
        for (w = y - 2; w >= -1 && w !== -1; w--) {
          const O = Number.MIN_VALUE + L * Math.abs(j[w] + Math.abs(j[w + 1]));
          if (Math.abs(C[w]) <= O || Number.isNaN(C[w])) {
            C[w] = 0;
            break;
          }
        }
        if (w === y - 2)
          N = 4;
        else {
          let O;
          for (O = y - 1; O >= w && O !== w; O--) {
            let B = (O !== y ? Math.abs(C[O]) : 0) + (O !== w + 1 ? Math.abs(C[O - 1]) : 0);
            if (Math.abs(j[O]) <= L * B) {
              j[O] = 0;
              break;
            }
          }
          O === w ? N = 3 : O === y - 1 ? N = 1 : (N = 2, w = O);
        }
        switch (w++, N) {
          case 1: {
            let O = C[y - 2];
            C[y - 2] = 0;
            for (let B = y - 2; B >= w; B--) {
              let pe = st(j[B], O), ae = j[B] / pe, Se = O / pe;
              if (j[B] = pe, B !== w && (O = -Se * C[B - 1], C[B - 1] = ae * C[B - 1]), k)
                for (let Te = 0; Te < o; Te++)
                  pe = ae * te.get(Te, B) + Se * te.get(Te, y - 1), te.set(Te, y - 1, -Se * te.get(Te, B) + ae * te.get(Te, y - 1)), te.set(Te, B, pe);
            }
            break;
          }
          case 2: {
            let O = C[w - 1];
            C[w - 1] = 0;
            for (let B = w; B < y; B++) {
              let pe = st(j[B], O), ae = j[B] / pe, Se = O / pe;
              if (j[B] = pe, O = -Se * C[B], C[B] = ae * C[B], S)
                for (let Te = 0; Te < r; Te++)
                  pe = ae * U.get(Te, B) + Se * U.get(Te, w - 1), U.set(Te, w - 1, -Se * U.get(Te, B) + ae * U.get(Te, w - 1)), U.set(Te, B, pe);
            }
            break;
          }
          case 3: {
            const O = Math.max(
              Math.abs(j[y - 1]),
              Math.abs(j[y - 2]),
              Math.abs(C[y - 2]),
              Math.abs(j[w]),
              Math.abs(C[w])
            ), B = j[y - 1] / O, pe = j[y - 2] / O, ae = C[y - 2] / O, Se = j[w] / O, Te = C[w] / O, Ie = ((pe + B) * (pe - B) + ae * ae) / 2, ot = B * ae * (B * ae);
            let Oe = 0;
            (Ie !== 0 || ot !== 0) && (Ie < 0 ? Oe = 0 - Math.sqrt(Ie * Ie + ot) : Oe = Math.sqrt(Ie * Ie + ot), Oe = ot / (Ie + Oe));
            let dt = (Se + B) * (Se - B) + Oe, vt = Se * Te;
            for (let be = w; be < y - 1; be++) {
              let Fe = st(dt, vt);
              Fe === 0 && (Fe = Number.MIN_VALUE);
              let Ke = dt / Fe, He = vt / Fe;
              if (be !== w && (C[be - 1] = Fe), dt = Ke * j[be] + He * C[be], C[be] = Ke * C[be] - He * j[be], vt = He * j[be + 1], j[be + 1] = Ke * j[be + 1], k)
                for (let Ae = 0; Ae < o; Ae++)
                  Fe = Ke * te.get(Ae, be) + He * te.get(Ae, be + 1), te.set(Ae, be + 1, -He * te.get(Ae, be) + Ke * te.get(Ae, be + 1)), te.set(Ae, be, Fe);
              if (Fe = st(dt, vt), Fe === 0 && (Fe = Number.MIN_VALUE), Ke = dt / Fe, He = vt / Fe, j[be] = Fe, dt = Ke * C[be] + He * j[be + 1], j[be + 1] = -He * C[be] + Ke * j[be + 1], vt = He * C[be + 1], C[be + 1] = Ke * C[be + 1], S && be < r - 1)
                for (let Ae = 0; Ae < r; Ae++)
                  Fe = Ke * U.get(Ae, be) + He * U.get(Ae, be + 1), U.set(Ae, be + 1, -He * U.get(Ae, be) + Ke * U.get(Ae, be + 1)), U.set(Ae, be, Fe);
            }
            C[y - 2] = dt;
            break;
          }
          case 4: {
            if (j[w] <= 0 && (j[w] = j[w] < 0 ? -j[w] : 0, k))
              for (let O = 0; O <= E; O++)
                te.set(O, w, -te.get(O, w));
            for (; w < E && !(j[w] >= j[w + 1]); ) {
              let O = j[w];
              if (j[w] = j[w + 1], j[w + 1] = O, k && w < o - 1)
                for (let B = 0; B < o; B++)
                  O = te.get(B, w + 1), te.set(B, w + 1, te.get(B, w)), te.set(B, w, O);
              if (S && w < r - 1)
                for (let B = 0; B < r; B++)
                  O = U.get(B, w + 1), U.set(B, w + 1, U.get(B, w)), U.set(B, w, O);
              w++;
            }
            y--;
            break;
          }
        }
      }
      if ($) {
        let w = te;
        te = U, U = w;
      }
      this.m = r, this.n = o, this.s = j, this.U = U, this.V = te;
    }
    solve(i) {
      let s = i, r = this.threshold, o = this.s.length, u = Q.zeros(o, o);
      for (let G = 0; G < o; G++)
        Math.abs(this.s[G]) <= r ? u.set(G, G, 0) : u.set(G, G, 1 / this.s[G]);
      let b = this.U, _ = this.rightSingularVectors, S = _.mmul(u), k = _.rows, $ = b.rows, T = Q.zeros(k, $);
      for (let G = 0; G < k; G++)
        for (let J = 0; J < $; J++) {
          let j = 0;
          for (let U = 0; U < o; U++)
            j += S.get(G, U) * b.get(J, U);
          T.set(G, J, j);
        }
      return T.mmul(s);
    }
    solveForDiagonal(i) {
      return this.solve(Q.diag(i));
    }
    inverse() {
      let i = this.V, s = this.threshold, r = i.rows, o = i.columns, u = new Q(r, this.s.length);
      for (let $ = 0; $ < r; $++)
        for (let T = 0; T < o; T++)
          Math.abs(this.s[T]) > s && u.set($, T, i.get($, T) / this.s[T]);
      let b = this.U, _ = b.rows, S = b.columns, k = new Q(r, _);
      for (let $ = 0; $ < r; $++)
        for (let T = 0; T < _; T++) {
          let G = 0;
          for (let J = 0; J < S; J++)
            G += u.get($, J) * b.get(T, J);
          k.set($, T, G);
        }
      return k;
    }
    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }
    get norm2() {
      return this.s[0];
    }
    get rank() {
      let i = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON, s = 0, r = this.s;
      for (let o = 0, u = r.length; o < u; o++)
        r[o] > i && s++;
      return s;
    }
    get diagonal() {
      return Array.from(this.s);
    }
    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }
    get leftSingularVectors() {
      return this.U;
    }
    get rightSingularVectors() {
      return this.V;
    }
    get diagonalMatrix() {
      return Q.diag(this.s);
    }
  }
  function Hn(d, i = !1) {
    return d = De.checkMatrix(d), i ? new ft(d).inverse() : bn(d, Q.eye(d.rows));
  }
  function bn(d, i, s = !1) {
    return d = De.checkMatrix(d), i = De.checkMatrix(i), s ? new ft(d).solve(i) : d.isSquare() ? new ze(d).solve(i) : new It(d).solve(i);
  }
  function Dt(d) {
    if (d = Q.checkMatrix(d), d.isSquare()) {
      if (d.columns === 0)
        return 1;
      let i, s, r, o;
      if (d.columns === 2)
        return i = d.get(0, 0), s = d.get(0, 1), r = d.get(1, 0), o = d.get(1, 1), i * o - s * r;
      if (d.columns === 3) {
        let u, b, _;
        return u = new Ct(d, [1, 2], [1, 2]), b = new Ct(d, [1, 2], [0, 2]), _ = new Ct(d, [1, 2], [0, 1]), i = d.get(0, 0), s = d.get(0, 1), r = d.get(0, 2), i * Dt(u) - s * Dt(b) + r * Dt(_);
      } else
        return new ze(d).determinant;
    } else
      throw Error("determinant can only be calculated for a square matrix");
  }
  function $e(d, i) {
    let s = [];
    for (let r = 0; r < d; r++)
      r !== i && s.push(r);
    return s;
  }
  function er(d, i, s, r = 1e-9, o = 1e-9) {
    if (d > o)
      return new Array(i.rows + 1).fill(0);
    {
      let u = i.addRow(s, [0]);
      for (let b = 0; b < u.rows; b++)
        Math.abs(u.get(b, 0)) < r && u.set(b, 0, 0);
      return u.to1DArray();
    }
  }
  function tr(d, i = {}) {
    const { thresholdValue: s = 1e-9, thresholdError: r = 1e-9 } = i;
    d = Q.checkMatrix(d);
    let o = d.rows, u = new Q(o, o);
    for (let b = 0; b < o; b++) {
      let _ = Q.columnVector(d.getRow(b)), S = d.subMatrixRow($e(o, b)).transpose(), $ = new ft(S).solve(_), T = Q.sub(_, S.mmul($)).abs().max();
      u.setRow(
        b,
        er(T, $, b, s, r)
      );
    }
    return u;
  }
  function _n(d, i = Number.EPSILON) {
    if (d = Q.checkMatrix(d), d.isEmpty())
      return d.transpose();
    let s = new ft(d, { autoTranspose: !0 }), r = s.leftSingularVectors, o = s.rightSingularVectors, u = s.diagonal;
    for (let b = 0; b < u.length; b++)
      Math.abs(u[b]) > i ? u[b] = 1 / u[b] : u[b] = 0;
    return o.mmul(Q.diag(u).mmul(r.transpose()));
  }
  function nr(d, i = d, s = {}) {
    d = new Q(d);
    let r = !1;
    if (typeof i == "object" && !Q.isMatrix(i) && !e.isAnyArray(i) ? (s = i, i = d, r = !0) : i = new Q(i), d.rows !== i.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: o = !0 } = s;
    o && (d = d.center("column"), r || (i = i.center("column")));
    const u = d.transpose().mmul(i);
    for (let b = 0; b < u.rows; b++)
      for (let _ = 0; _ < u.columns; _++)
        u.set(b, _, u.get(b, _) * (1 / (d.rows - 1)));
    return u;
  }
  function rr(d, i = d, s = {}) {
    d = new Q(d);
    let r = !1;
    if (typeof i == "object" && !Q.isMatrix(i) && !e.isAnyArray(i) ? (s = i, i = d, r = !0) : i = new Q(i), d.rows !== i.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: o = !0, scale: u = !0 } = s;
    o && (d.center("column"), r || i.center("column")), u && (d.scale("column"), r || i.scale("column"));
    const b = d.standardDeviation("column", { unbiased: !0 }), _ = r ? b : i.standardDeviation("column", { unbiased: !0 }), S = d.transpose().mmul(i);
    for (let k = 0; k < S.rows; k++)
      for (let $ = 0; $ < S.columns; $++)
        S.set(
          k,
          $,
          S.get(k, $) * (1 / (b[k] * _[$])) * (1 / (d.rows - 1))
        );
    return S;
  }
  class Jt {
    constructor(i, s = {}) {
      const { assumeSymmetric: r = !1 } = s;
      if (i = De.checkMatrix(i), !i.isSquare())
        throw new Error("Matrix is not a square matrix");
      if (i.isEmpty())
        throw new Error("Matrix must be non-empty");
      let o = i.columns, u = new Q(o, o), b = new Float64Array(o), _ = new Float64Array(o), S = i, k, $, T = !1;
      if (r ? T = !0 : T = i.isSymmetric(), T) {
        for (k = 0; k < o; k++)
          for ($ = 0; $ < o; $++)
            u.set(k, $, S.get(k, $));
        ir(o, _, b, u), sr(o, _, b, u);
      } else {
        let G = new Q(o, o), J = new Float64Array(o);
        for ($ = 0; $ < o; $++)
          for (k = 0; k < o; k++)
            G.set(k, $, S.get(k, $));
        xn(o, G, J, u), or(o, _, b, u, G);
      }
      this.n = o, this.e = _, this.d = b, this.V = u;
    }
    get realEigenvalues() {
      return Array.from(this.d);
    }
    get imaginaryEigenvalues() {
      return Array.from(this.e);
    }
    get eigenvectorMatrix() {
      return this.V;
    }
    get diagonalMatrix() {
      let i = this.n, s = this.e, r = this.d, o = new Q(i, i), u, b;
      for (u = 0; u < i; u++) {
        for (b = 0; b < i; b++)
          o.set(u, b, 0);
        o.set(u, u, r[u]), s[u] > 0 ? o.set(u, u + 1, s[u]) : s[u] < 0 && o.set(u, u - 1, s[u]);
      }
      return o;
    }
  }
  function ir(d, i, s, r) {
    let o, u, b, _, S, k, $, T;
    for (S = 0; S < d; S++)
      s[S] = r.get(d - 1, S);
    for (_ = d - 1; _ > 0; _--) {
      for (T = 0, b = 0, k = 0; k < _; k++)
        T = T + Math.abs(s[k]);
      if (T === 0)
        for (i[_] = s[_ - 1], S = 0; S < _; S++)
          s[S] = r.get(_ - 1, S), r.set(_, S, 0), r.set(S, _, 0);
      else {
        for (k = 0; k < _; k++)
          s[k] /= T, b += s[k] * s[k];
        for (o = s[_ - 1], u = Math.sqrt(b), o > 0 && (u = -u), i[_] = T * u, b = b - o * u, s[_ - 1] = o - u, S = 0; S < _; S++)
          i[S] = 0;
        for (S = 0; S < _; S++) {
          for (o = s[S], r.set(S, _, o), u = i[S] + r.get(S, S) * o, k = S + 1; k <= _ - 1; k++)
            u += r.get(k, S) * s[k], i[k] += r.get(k, S) * o;
          i[S] = u;
        }
        for (o = 0, S = 0; S < _; S++)
          i[S] /= b, o += i[S] * s[S];
        for ($ = o / (b + b), S = 0; S < _; S++)
          i[S] -= $ * s[S];
        for (S = 0; S < _; S++) {
          for (o = s[S], u = i[S], k = S; k <= _ - 1; k++)
            r.set(k, S, r.get(k, S) - (o * i[k] + u * s[k]));
          s[S] = r.get(_ - 1, S), r.set(_, S, 0);
        }
      }
      s[_] = b;
    }
    for (_ = 0; _ < d - 1; _++) {
      if (r.set(d - 1, _, r.get(_, _)), r.set(_, _, 1), b = s[_ + 1], b !== 0) {
        for (k = 0; k <= _; k++)
          s[k] = r.get(k, _ + 1) / b;
        for (S = 0; S <= _; S++) {
          for (u = 0, k = 0; k <= _; k++)
            u += r.get(k, _ + 1) * r.get(k, S);
          for (k = 0; k <= _; k++)
            r.set(k, S, r.get(k, S) - u * s[k]);
        }
      }
      for (k = 0; k <= _; k++)
        r.set(k, _ + 1, 0);
    }
    for (S = 0; S < d; S++)
      s[S] = r.get(d - 1, S), r.set(d - 1, S, 0);
    r.set(d - 1, d - 1, 1), i[0] = 0;
  }
  function sr(d, i, s, r) {
    let o, u, b, _, S, k, $, T, G, J, j, U, te, C, Y, se;
    for (b = 1; b < d; b++)
      i[b - 1] = i[b];
    i[d - 1] = 0;
    let ge = 0, me = 0, Le = Number.EPSILON;
    for (k = 0; k < d; k++) {
      for (me = Math.max(me, Math.abs(s[k]) + Math.abs(i[k])), $ = k; $ < d && !(Math.abs(i[$]) <= Le * me); )
        $++;
      if ($ > k)
        do {
          for (o = s[k], T = (s[k + 1] - o) / (2 * i[k]), G = st(T, 1), T < 0 && (G = -G), s[k] = i[k] / (T + G), s[k + 1] = i[k] * (T + G), J = s[k + 1], u = o - s[k], b = k + 2; b < d; b++)
            s[b] -= u;
          for (ge = ge + u, T = s[$], j = 1, U = j, te = j, C = i[k + 1], Y = 0, se = 0, b = $ - 1; b >= k; b--)
            for (te = U, U = j, se = Y, o = j * i[b], u = j * T, G = st(T, i[b]), i[b + 1] = Y * G, Y = i[b] / G, j = T / G, T = j * s[b] - Y * o, s[b + 1] = u + Y * (j * o + Y * s[b]), S = 0; S < d; S++)
              u = r.get(S, b + 1), r.set(S, b + 1, Y * r.get(S, b) + j * u), r.set(S, b, j * r.get(S, b) - Y * u);
          T = -Y * se * te * C * i[k] / J, i[k] = Y * T, s[k] = j * T;
        } while (Math.abs(i[k]) > Le * me);
      s[k] = s[k] + ge, i[k] = 0;
    }
    for (b = 0; b < d - 1; b++) {
      for (S = b, T = s[b], _ = b + 1; _ < d; _++)
        s[_] < T && (S = _, T = s[_]);
      if (S !== b)
        for (s[S] = s[b], s[b] = T, _ = 0; _ < d; _++)
          T = r.get(_, b), r.set(_, b, r.get(_, S)), r.set(_, S, T);
    }
  }
  function xn(d, i, s, r) {
    let o = 0, u = d - 1, b, _, S, k, $, T, G;
    for (T = o + 1; T <= u - 1; T++) {
      for (G = 0, k = T; k <= u; k++)
        G = G + Math.abs(i.get(k, T - 1));
      if (G !== 0) {
        for (S = 0, k = u; k >= T; k--)
          s[k] = i.get(k, T - 1) / G, S += s[k] * s[k];
        for (_ = Math.sqrt(S), s[T] > 0 && (_ = -_), S = S - s[T] * _, s[T] = s[T] - _, $ = T; $ < d; $++) {
          for (b = 0, k = u; k >= T; k--)
            b += s[k] * i.get(k, $);
          for (b = b / S, k = T; k <= u; k++)
            i.set(k, $, i.get(k, $) - b * s[k]);
        }
        for (k = 0; k <= u; k++) {
          for (b = 0, $ = u; $ >= T; $--)
            b += s[$] * i.get(k, $);
          for (b = b / S, $ = T; $ <= u; $++)
            i.set(k, $, i.get(k, $) - b * s[$]);
        }
        s[T] = G * s[T], i.set(T, T - 1, G * _);
      }
    }
    for (k = 0; k < d; k++)
      for ($ = 0; $ < d; $++)
        r.set(k, $, k === $ ? 1 : 0);
    for (T = u - 1; T >= o + 1; T--)
      if (i.get(T, T - 1) !== 0) {
        for (k = T + 1; k <= u; k++)
          s[k] = i.get(k, T - 1);
        for ($ = T; $ <= u; $++) {
          for (_ = 0, k = T; k <= u; k++)
            _ += s[k] * r.get(k, $);
          for (_ = _ / s[T] / i.get(T, T - 1), k = T; k <= u; k++)
            r.set(k, $, r.get(k, $) + _ * s[k]);
        }
      }
  }
  function or(d, i, s, r, o) {
    let u = d - 1, b = 0, _ = d - 1, S = Number.EPSILON, k = 0, $ = 0, T = 0, G = 0, J = 0, j = 0, U = 0, te = 0, C, Y, se, ge, me, Le, y, E, L, w, N, O, B, pe, ae;
    for (C = 0; C < d; C++)
      for ((C < b || C > _) && (s[C] = o.get(C, C), i[C] = 0), Y = Math.max(C - 1, 0); Y < d; Y++)
        $ = $ + Math.abs(o.get(C, Y));
    for (; u >= b; ) {
      for (ge = u; ge > b && (j = Math.abs(o.get(ge - 1, ge - 1)) + Math.abs(o.get(ge, ge)), j === 0 && (j = $), !(Math.abs(o.get(ge, ge - 1)) < S * j)); )
        ge--;
      if (ge === u)
        o.set(u, u, o.get(u, u) + k), s[u] = o.get(u, u), i[u] = 0, u--, te = 0;
      else if (ge === u - 1) {
        if (y = o.get(u, u - 1) * o.get(u - 1, u), T = (o.get(u - 1, u - 1) - o.get(u, u)) / 2, G = T * T + y, U = Math.sqrt(Math.abs(G)), o.set(u, u, o.get(u, u) + k), o.set(u - 1, u - 1, o.get(u - 1, u - 1) + k), E = o.get(u, u), G >= 0) {
          for (U = T >= 0 ? T + U : T - U, s[u - 1] = E + U, s[u] = s[u - 1], U !== 0 && (s[u] = E - y / U), i[u - 1] = 0, i[u] = 0, E = o.get(u, u - 1), j = Math.abs(E) + Math.abs(U), T = E / j, G = U / j, J = Math.sqrt(T * T + G * G), T = T / J, G = G / J, Y = u - 1; Y < d; Y++)
            U = o.get(u - 1, Y), o.set(u - 1, Y, G * U + T * o.get(u, Y)), o.set(u, Y, G * o.get(u, Y) - T * U);
          for (C = 0; C <= u; C++)
            U = o.get(C, u - 1), o.set(C, u - 1, G * U + T * o.get(C, u)), o.set(C, u, G * o.get(C, u) - T * U);
          for (C = b; C <= _; C++)
            U = r.get(C, u - 1), r.set(C, u - 1, G * U + T * r.get(C, u)), r.set(C, u, G * r.get(C, u) - T * U);
        } else
          s[u - 1] = E + T, s[u] = E + T, i[u - 1] = U, i[u] = -U;
        u = u - 2, te = 0;
      } else {
        if (E = o.get(u, u), L = 0, y = 0, ge < u && (L = o.get(u - 1, u - 1), y = o.get(u, u - 1) * o.get(u - 1, u)), te === 10) {
          for (k += E, C = b; C <= u; C++)
            o.set(C, C, o.get(C, C) - E);
          j = Math.abs(o.get(u, u - 1)) + Math.abs(o.get(u - 1, u - 2)), E = L = 0.75 * j, y = -0.4375 * j * j;
        }
        if (te === 30 && (j = (L - E) / 2, j = j * j + y, j > 0)) {
          for (j = Math.sqrt(j), L < E && (j = -j), j = E - y / ((L - E) / 2 + j), C = b; C <= u; C++)
            o.set(C, C, o.get(C, C) - j);
          k += j, E = L = y = 0.964;
        }
        for (te = te + 1, me = u - 2; me >= ge && (U = o.get(me, me), J = E - U, j = L - U, T = (J * j - y) / o.get(me + 1, me) + o.get(me, me + 1), G = o.get(me + 1, me + 1) - U - J - j, J = o.get(me + 2, me + 1), j = Math.abs(T) + Math.abs(G) + Math.abs(J), T = T / j, G = G / j, J = J / j, !(me === ge || Math.abs(o.get(me, me - 1)) * (Math.abs(G) + Math.abs(J)) < S * (Math.abs(T) * (Math.abs(o.get(me - 1, me - 1)) + Math.abs(U) + Math.abs(o.get(me + 1, me + 1)))))); )
          me--;
        for (C = me + 2; C <= u; C++)
          o.set(C, C - 2, 0), C > me + 2 && o.set(C, C - 3, 0);
        for (se = me; se <= u - 1 && (pe = se !== u - 1, se !== me && (T = o.get(se, se - 1), G = o.get(se + 1, se - 1), J = pe ? o.get(se + 2, se - 1) : 0, E = Math.abs(T) + Math.abs(G) + Math.abs(J), E !== 0 && (T = T / E, G = G / E, J = J / E)), E !== 0); se++)
          if (j = Math.sqrt(T * T + G * G + J * J), T < 0 && (j = -j), j !== 0) {
            for (se !== me ? o.set(se, se - 1, -j * E) : ge !== me && o.set(se, se - 1, -o.get(se, se - 1)), T = T + j, E = T / j, L = G / j, U = J / j, G = G / T, J = J / T, Y = se; Y < d; Y++)
              T = o.get(se, Y) + G * o.get(se + 1, Y), pe && (T = T + J * o.get(se + 2, Y), o.set(se + 2, Y, o.get(se + 2, Y) - T * U)), o.set(se, Y, o.get(se, Y) - T * E), o.set(se + 1, Y, o.get(se + 1, Y) - T * L);
            for (C = 0; C <= Math.min(u, se + 3); C++)
              T = E * o.get(C, se) + L * o.get(C, se + 1), pe && (T = T + U * o.get(C, se + 2), o.set(C, se + 2, o.get(C, se + 2) - T * J)), o.set(C, se, o.get(C, se) - T), o.set(C, se + 1, o.get(C, se + 1) - T * G);
            for (C = b; C <= _; C++)
              T = E * r.get(C, se) + L * r.get(C, se + 1), pe && (T = T + U * r.get(C, se + 2), r.set(C, se + 2, r.get(C, se + 2) - T * J)), r.set(C, se, r.get(C, se) - T), r.set(C, se + 1, r.get(C, se + 1) - T * G);
          }
      }
    }
    if ($ !== 0) {
      for (u = d - 1; u >= 0; u--)
        if (T = s[u], G = i[u], G === 0)
          for (ge = u, o.set(u, u, 1), C = u - 1; C >= 0; C--) {
            for (y = o.get(C, C) - T, J = 0, Y = ge; Y <= u; Y++)
              J = J + o.get(C, Y) * o.get(Y, u);
            if (i[C] < 0)
              U = y, j = J;
            else if (ge = C, i[C] === 0 ? o.set(C, u, y !== 0 ? -J / y : -J / (S * $)) : (E = o.get(C, C + 1), L = o.get(C + 1, C), G = (s[C] - T) * (s[C] - T) + i[C] * i[C], Le = (E * j - U * J) / G, o.set(C, u, Le), o.set(
              C + 1,
              u,
              Math.abs(E) > Math.abs(U) ? (-J - y * Le) / E : (-j - L * Le) / U
            )), Le = Math.abs(o.get(C, u)), S * Le * Le > 1)
              for (Y = C; Y <= u; Y++)
                o.set(Y, u, o.get(Y, u) / Le);
          }
        else if (G < 0)
          for (ge = u - 1, Math.abs(o.get(u, u - 1)) > Math.abs(o.get(u - 1, u)) ? (o.set(u - 1, u - 1, G / o.get(u, u - 1)), o.set(u - 1, u, -(o.get(u, u) - T) / o.get(u, u - 1))) : (ae = Pt(0, -o.get(u - 1, u), o.get(u - 1, u - 1) - T, G), o.set(u - 1, u - 1, ae[0]), o.set(u - 1, u, ae[1])), o.set(u, u - 1, 0), o.set(u, u, 1), C = u - 2; C >= 0; C--) {
            for (w = 0, N = 0, Y = ge; Y <= u; Y++)
              w = w + o.get(C, Y) * o.get(Y, u - 1), N = N + o.get(C, Y) * o.get(Y, u);
            if (y = o.get(C, C) - T, i[C] < 0)
              U = y, J = w, j = N;
            else if (ge = C, i[C] === 0 ? (ae = Pt(-w, -N, y, G), o.set(C, u - 1, ae[0]), o.set(C, u, ae[1])) : (E = o.get(C, C + 1), L = o.get(C + 1, C), O = (s[C] - T) * (s[C] - T) + i[C] * i[C] - G * G, B = (s[C] - T) * 2 * G, O === 0 && B === 0 && (O = S * $ * (Math.abs(y) + Math.abs(G) + Math.abs(E) + Math.abs(L) + Math.abs(U))), ae = Pt(
              E * J - U * w + G * N,
              E * j - U * N - G * w,
              O,
              B
            ), o.set(C, u - 1, ae[0]), o.set(C, u, ae[1]), Math.abs(E) > Math.abs(U) + Math.abs(G) ? (o.set(
              C + 1,
              u - 1,
              (-w - y * o.get(C, u - 1) + G * o.get(C, u)) / E
            ), o.set(
              C + 1,
              u,
              (-N - y * o.get(C, u) - G * o.get(C, u - 1)) / E
            )) : (ae = Pt(
              -J - L * o.get(C, u - 1),
              -j - L * o.get(C, u),
              U,
              G
            ), o.set(C + 1, u - 1, ae[0]), o.set(C + 1, u, ae[1]))), Le = Math.max(Math.abs(o.get(C, u - 1)), Math.abs(o.get(C, u))), S * Le * Le > 1)
              for (Y = C; Y <= u; Y++)
                o.set(Y, u - 1, o.get(Y, u - 1) / Le), o.set(Y, u, o.get(Y, u) / Le);
          }
      for (C = 0; C < d; C++)
        if (C < b || C > _)
          for (Y = C; Y < d; Y++)
            r.set(C, Y, o.get(C, Y));
      for (Y = d - 1; Y >= b; Y--)
        for (C = b; C <= _; C++) {
          for (U = 0, se = b; se <= Math.min(Y, _); se++)
            U = U + r.get(C, se) * o.get(se, Y);
          r.set(C, Y, U);
        }
    }
  }
  function Pt(d, i, s, r) {
    let o, u;
    return Math.abs(s) > Math.abs(r) ? (o = r / s, u = s + o * r, [(d + o * i) / u, (i - o * d) / u]) : (o = s / r, u = r + o * s, [(o * d + i) / u, (o * i - d) / u]);
  }
  class Zt {
    constructor(i) {
      if (i = De.checkMatrix(i), !i.isSymmetric())
        throw new Error("Matrix is not symmetric");
      let s = i, r = s.rows, o = new Q(r, r), u = !0, b, _, S;
      for (_ = 0; _ < r; _++) {
        let k = 0;
        for (S = 0; S < _; S++) {
          let $ = 0;
          for (b = 0; b < S; b++)
            $ += o.get(S, b) * o.get(_, b);
          $ = (s.get(_, S) - $) / o.get(S, S), o.set(_, S, $), k = k + $ * $;
        }
        for (k = s.get(_, _) - k, u &&= k > 0, o.set(_, _, Math.sqrt(Math.max(k, 0))), S = _ + 1; S < r; S++)
          o.set(_, S, 0);
      }
      this.L = o, this.positiveDefinite = u;
    }
    isPositiveDefinite() {
      return this.positiveDefinite;
    }
    solve(i) {
      i = De.checkMatrix(i);
      let s = this.L, r = s.rows;
      if (i.rows !== r)
        throw new Error("Matrix dimensions do not match");
      if (this.isPositiveDefinite() === !1)
        throw new Error("Matrix is not positive definite");
      let o = i.columns, u = i.clone(), b, _, S;
      for (S = 0; S < r; S++)
        for (_ = 0; _ < o; _++) {
          for (b = 0; b < S; b++)
            u.set(S, _, u.get(S, _) - u.get(b, _) * s.get(S, b));
          u.set(S, _, u.get(S, _) / s.get(S, S));
        }
      for (S = r - 1; S >= 0; S--)
        for (_ = 0; _ < o; _++) {
          for (b = S + 1; b < r; b++)
            u.set(S, _, u.get(S, _) - u.get(b, _) * s.get(b, S));
          u.set(S, _, u.get(S, _) / s.get(S, S));
        }
      return u;
    }
    get lowerTriangularMatrix() {
      return this.L;
    }
  }
  class Kt {
    constructor(i, s = {}) {
      i = De.checkMatrix(i);
      let { Y: r } = s;
      const {
        scaleScores: o = !1,
        maxIterations: u = 1e3,
        terminationCriteria: b = 1e-10
      } = s;
      let _;
      if (r) {
        if (e.isAnyArray(r) && typeof r[0] == "number" ? r = Q.columnVector(r) : r = De.checkMatrix(r), r.rows !== i.rows)
          throw new Error("Y should have the same number of rows as X");
        _ = r.getColumnVector(0);
      } else
        _ = i.getColumnVector(0);
      let S = 1, k, $, T, G;
      for (let J = 0; J < u && S > b; J++)
        T = i.transpose().mmul(_).div(_.transpose().mmul(_).get(0, 0)), T = T.div(T.norm()), k = i.mmul(T).div(T.transpose().mmul(T).get(0, 0)), J > 0 && (S = k.clone().sub(G).pow(2).sum()), G = k.clone(), r ? ($ = r.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0)), $ = $.div($.norm()), _ = r.mmul($).div($.transpose().mmul($).get(0, 0))) : _ = k;
      if (r) {
        let J = i.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0));
        J = J.div(J.norm());
        let j = i.clone().sub(k.clone().mmul(J.transpose())), U = _.transpose().mmul(k).div(k.transpose().mmul(k).get(0, 0)), te = r.clone().sub(
          k.clone().mulS(U.get(0, 0)).mmul($.transpose())
        );
        this.t = k, this.p = J.transpose(), this.w = T.transpose(), this.q = $, this.u = _, this.s = k.transpose().mmul(k), this.xResidual = j, this.yResidual = te, this.betas = U;
      } else
        this.w = T.transpose(), this.s = k.transpose().mmul(k).sqrt(), o ? this.t = k.clone().div(this.s.get(0, 0)) : this.t = k, this.xResidual = i.sub(k.mmul(T.transpose()));
    }
  }
  return ye.AbstractMatrix = ne, ye.CHO = Zt, ye.CholeskyDecomposition = Zt, ye.DistanceMatrix = Re, ye.EVD = Jt, ye.EigenvalueDecomposition = Jt, ye.LU = ze, ye.LuDecomposition = ze, ye.Matrix = Q, ye.MatrixColumnSelectionView = yt, ye.MatrixColumnView = Be, ye.MatrixFlipColumnView = ct, ye.MatrixFlipRowView = Tt, ye.MatrixRowSelectionView = wn, ye.MatrixRowView = Rt, ye.MatrixSelectionView = Ct, ye.MatrixSubView = yn, ye.MatrixTransposeView = vn, ye.NIPALS = Kt, ye.Nipals = Kt, ye.QR = It, ye.QrDecomposition = It, ye.SVD = ft, ye.SingularValueDecomposition = ft, ye.SymmetricMatrix = Ne, ye.WrapperMatrix1D = Yt, ye.WrapperMatrix2D = De, ye.correlation = rr, ye.covariance = nr, ye.default = Q, ye.determinant = Dt, ye.inverse = Hn, ye.linearDependencies = tr, ye.pseudoInverse = _n, ye.solve = bn, ye.wrap = Kn, ye;
}
var is = /* @__PURE__ */ Xh();
const gi = /* @__PURE__ */ ns(is), nt = gi.Matrix ? gi.Matrix : is.Matrix;
var Fn = { exports: {} }, Qh = Fn.exports, pi;
function Yh() {
  return pi || (pi = 1, (function(e, t) {
    (function(n, l) {
      e.exports = l();
    })(Qh, function() {
      function n(c) {
        c = c.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (W, ie, oe, he) => ie + he.replaceAll(".", " ."));
        var f = c.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), p = f.length, g, v, m, x, R, P = [], F = [], A, M, D = 0, q = 0, I = 0, V = 0, K = 0, ee = 0, le = 0, de = 0, H = 0, ce = 0, ve = 0, re = 0, z = 0, Z = "";
        for (g = 1; g < p; g++) {
          if (v = f[g], m = v.substring(0, 1), x = m.toLowerCase(), P = v.replace(m, "").trim().split(" ").filter(function(W) {
            return W !== "";
          }), F = P, P = P.map(parseFloat), A = P.length, x === "m") {
            if (Z += "M ", m === "m" ? (I += P[0], V += P[1]) : (I = P[0], V = P[1]), D = I, q = V, Z += I + " " + V + " ", A > 2)
              for (M = 0; M < A; M += 2)
                m === "m" ? (I += P[M], V += P[M + 1]) : (I = P[M], V = P[M + 1]), Z += "L " + I + " " + V + " ";
          } else if (x === "l")
            for (M = 0; M < A; M += 2)
              m === "l" ? (I += P[M], V += P[M + 1]) : (I = P[M], V = P[M + 1]), Z += "L " + I + " " + V + " ";
          else if (x === "h")
            for (M = 0; M < A; M++)
              m === "h" ? I += P[M] : I = P[M], Z += "L " + I + " " + V + " ";
          else if (x === "v")
            for (M = 0; M < A; M++)
              m === "v" ? V += P[M] : V = P[M], Z += "L " + I + " " + V + " ";
          else if (x === "q")
            for (M = 0; M < A; M += 4)
              m === "q" ? (K = I + P[M], ee = V + P[M + 1], I += P[M + 2], V += P[M + 3]) : (K = P[M], ee = P[M + 1], I = P[M + 2], V = P[M + 3]), Z += "Q " + K + " " + ee + " " + I + " " + V + " ";
          else if (x === "t")
            for (M = 0; M < A; M += 2)
              ["t", "q"].indexOf(R) > -1 ? (K = I + (I - K), ee = V + (V - ee)) : (K = I, ee = V), m === "t" ? (I += P[M], V += P[M + 1]) : (I = P[M], V = P[M + 1]), Z += "Q " + K + " " + ee + " " + I + " " + V + " ", R = x;
          else if (x === "c")
            for (M = 0; M < A; M += 6)
              m === "c" ? (K = I + P[M], ee = V + P[M + 1], le = I + P[M + 2], de = V + P[M + 3], I += P[M + 4], V += P[M + 5]) : (K = P[M], ee = P[M + 1], le = P[M + 2], de = P[M + 3], I = P[M + 4], V = P[M + 5]), Z += "C " + K + " " + ee + " " + le + " " + de + " " + I + " " + V + " ";
          else if (x === "s")
            for (M = 0; M < A; M += 4)
              K = I, ee = V, ["s", "c"].indexOf(R) > -1 && (K += I - le, ee += V - de), m === "s" ? (le = I + P[M], de = V + P[M + 1], I += P[M + 2], V += P[M + 3]) : (le = P[M], de = P[M + 1], I = P[M + 2], V = P[M + 3]), Z += "C " + K + " " + ee + " " + le + " " + de + " " + I + " " + V + " ";
          else if (x === "a")
            for (M = 0; M < A; M += 7) {
              H = P[M], ce = P[M + 1], ve = P[M + 2], re = F[M + 3];
              let W = !1;
              if (re.length > 1) {
                let ie = parseInt(re[0]), oe = parseInt(re[1]), he;
                re.length > 2 && (he = parseFloat(re.substring(2))), P[M + 3] = ie, P.splice(M + 4, 0, oe), F.splice(M + 4, 0, "+"), he !== void 0 && P.splice(M + 5, 0, he), W = !0;
              }
              re = P[M + 3], z = W ? P[M + 4] : F[M + 4], !W && z.length > 1 && (P[M + 4] = parseInt(z[0]), P.splice(M + 5, 0, parseFloat(z.substring(1)))), z = P[M + 4], m === "a" ? (I += P[M + 5], V += P[M + 6]) : (I = P[M + 5], V = P[M + 6]), Z += "A " + H + " " + ce + " " + ve + " " + re + " " + z + " " + I + " " + V + " ";
            }
          else x === "z" && (Z += "Z ", I = D, V = q);
          R = x;
        }
        return Z.trim();
      }
      function l(c) {
        var f = c.trim().split(" "), p, g = f.length, v = g - 1, m, x = [], R, P, F, A, M, D = new RegExp("[QAZLCM]", ""), q = f.slice(-1)[0].toUpperCase() === "Z";
        for (m = 0; m < g; m++)
          if (p = f[m], D.test(p)) {
            if (p === "A") {
              x.push(f[m + 5] === "0" ? "1" : "0"), x.push(f[m + 4]), x.push(f[m + 3]), x.push(f[m + 2]), x.push(f[m + 1]), x.push(p), x.push(f[m + 7]), x.push(f[m + 6]), m += 7;
              continue;
            } else if (p === "C")
              A = 3, M = 2;
            else if (p === "Q")
              A = 2, M = 1;
            else if (p === "L")
              A = 1, M = 1;
            else if (p === "M")
              A = 1, M = 0;
            else
              continue;
            for (A === M && x.push(p), F = 0; F < A; F++)
              F === M && x.push(p), R = f[++m], P = f[++m], x.push(P), x.push(R);
          } else {
            var I = f.slice(Math.max(m - 3, 0), 3).join(" ");
            throw post = f.slice(m + 1, Math.min(m + 4, v)).join(" "), range = I + " [" + p + "] " + post, "Error while trying to reverse normalized SVG path, at position " + m + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
          }
        x.push("M");
        var V = "", K = x.length - 1, ee;
        for (ee = K; ee > 0; ee--)
          V += x[ee] + " ";
        return q && (V += "Z"), V = V.replace(/M M/g, "Z M"), V;
      }
      function a(p, f) {
        f = parseInt(f) == f ? f : !1;
        var p = n(p), g = p.replace(/M/g, "|M").split("|"), v;
        if (g.splice(0, 1), f !== !1 && f >= g.length)
          return p;
        if (f === !1)
          g = g.map(function(x) {
            return l(x.trim());
          });
        else {
          var m = g[f];
          m && (v = l(m.trim()), g[f] = v);
        }
        return g.reverse().join(" ").replace(/ +/g, " ").trim();
      }
      var h = {
        normalize: n,
        reverseNormalized: l,
        reverse: a
      };
      return h;
    });
  })(Fn)), Fn.exports;
}
var Jh = Yh();
const mi = /* @__PURE__ */ ns(Jh);
function Zh(e, t, n, l) {
  switch (e.pathType) {
    case tt.REFLEXIVE:
      return ss(e.source, [t / 2, n / 2], l);
    case tt.ARC:
      return kr(e.source, e.target, l);
    case tt.ARCREVERSE:
      return mi.reverse(kr(e.source, e.target, l));
    case tt.LINE:
      return on(e.source, e.target, l);
    case tt.LINEREVERSE:
      return mi.reverse(on(e.source, e.target, l));
    default:
      return "";
  }
}
function Kh(e, t, n) {
  return e.id === t.id ? tt.REFLEXIVE : n.hasBidirectionalConnection(e, t) ? wi(e, t) ? tt.ARCREVERSE : tt.ARC : wi(e, t) ? tt.LINEREVERSE : tt.LINE;
}
function on(e, t, n) {
  const l = { x: t.x - e.x, y: t.y - e.y };
  let a = Math.sqrt(l.x * l.x + l.y * l.y);
  a === 0 && (a = Number.EPSILON);
  const h = l.x / a, c = l.y / a, f = Hh(e, t, n, h, c);
  return `M${f.start.x},${f.start.y}
          L${f.end.x},${f.end.y}`;
}
function Hh(e, t, n, l, a) {
  let h, c;
  return e.props.shape === ue.CIRCLE ? h = {
    x: e.x + (e.renderedSize.radius - 1) * l,
    y: e.y + (e.renderedSize.radius - 1) * a
  } : e.props.shape === ue.RECTANGLE && (h = Qn(
    e.x,
    e.y,
    e.renderedSize.width,
    e.renderedSize.height,
    l,
    a,
    2
  )), t instanceof Xn ? c = t.props.shape === ue.CIRCLE ? {
    x: t.x - (t.renderedSize.radius + n.markerPadding) * l,
    y: t.y - (t.renderedSize.radius + n.markerPadding) * a
  } : Qn(
    t.x,
    t.y,
    t.renderedSize.width,
    t.renderedSize.height,
    -l,
    -a,
    -n.markerPadding + 1
  ) : c = {
    x: t.x,
    y: t.y
  }, { start: h, end: c };
}
function kr(e, t, n) {
  const l = new nt([[e.x, e.y]]), a = new nt([[t.x, t.y]]), h = nt.subtract(a, l), c = h.norm("frobenius"), f = h.divide(c);
  let p = e.props.shape === ue.CIRCLE ? qt(10) : qt(30), g = t.props.shape === ue.CIRCLE ? qt(10) : qt(30), v = 1.2 * c;
  const m = ec(e, t, n, l, a, f, {
    start: p,
    end: g
  });
  return `M${m.start.get(0, 0)},${m.start.get(0, 1)}
          A${v},${v},0,0,1,${m.end.get(0, 0)},${m.end.get(0, 1)}`;
}
function ec(e, t, n, l, a, h, c) {
  let f, p;
  if (e.props.shape === ue.CIRCLE)
    f = Ve(h, -c.start).multiply(e.renderedSize.radius - 1).add(l);
  else if (e.props.shape === ue.RECTANGLE) {
    const g = Qn(
      e.x,
      e.y,
      e.renderedSize.width,
      e.renderedSize.height,
      h.get(0, 0),
      h.get(0, 1),
      2
    );
    f = Ve(h, -c.start).add([[g.x, g.y]]);
  }
  if (t.props.shape === ue.CIRCLE) {
    const g = nt.multiply(h, -1);
    p = Ve(g, c.end).multiply(t.renderedSize.radius).add(a).add(Ve(g, c.end).multiply(2 * n.markerBoxSize));
  } else if (t.props.shape === ue.RECTANGLE) {
    const g = Qn(
      t.x,
      t.y,
      t.renderedSize.width,
      t.renderedSize.height,
      -h.get(0, 0),
      -h.get(0, 1)
    ), v = nt.multiply(h, -1);
    p = Ve(v, c.end).add([[g.x, g.y]]).add(Ve(v, c.end).multiply(2 * n.markerBoxSize));
  }
  return { start: f, end: p };
}
function ss(e, t, n) {
  const l = new nt([t]);
  if (e.props.shape === ue.CIRCLE) {
    const a = new nt([[e.x, e.y]]);
    a.get(0, 0) === l.get(0, 0) && a.get(0, 1) === l.get(0, 1) && l.add([[0, 1]]);
    const h = nt.subtract(a, l), c = h.divide(h.norm("frobenius")), f = qt(40), p = Ve(c, f).multiply(e.renderedSize.radius - 1).add(a), g = Ve(c, -f).multiply(e.renderedSize.radius).add(a).add(Ve(c, -f).multiply(2 * n.markerBoxSize));
    return `M${p.get(0, 0)},${p.get(0, 1)}
              A${e.renderedSize.radius},${e.renderedSize.radius},0,1,0,${g.get(0, 0)},${g.get(0, 1)}`;
  } else return e.props.shape === ue.RECTANGLE ? e.props.reflexiveEdgeStart == "MOVABLE" ? tc(e, n, l) : nc(e, n) : "";
}
function wi(e, t) {
  return e.x > t.x;
}
function tc(e, t, n) {
  if (e.props.shape === ue.RECTANGLE) {
    const l = new nt([[e.x, e.y]]);
    l.get(0, 0) === n.get(0, 0) && l.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const a = nt.subtract(l, n), h = a.divide(a.norm("frobenius")), c = qt(45);
    let f, p, g = 0.5 * e.renderedSize.width, v = 0.5 * e.renderedSize.height;
    const m = rc(
      a.get(0, 0),
      a.get(0, 1),
      30
    );
    if (m === xe.BOTTOMLEFT || m === xe.BOTTOMRIGHT || m === xe.TOPLEFT || m === xe.TOPRIGHT) {
      let x = os(m, e, t);
      f = x.start, p = x.end, e.renderedSize.width > e.renderedSize.height ? (m === xe.TOPLEFT || m === xe.BOTTOMRIGHT) && (g = 0.25 * e.renderedSize.width) : e.renderedSize.height > e.renderedSize.width && (m === xe.TOPRIGHT || m === xe.BOTTOMLEFT) && (v = 0.25 * e.renderedSize.height);
    } else m === xe.LEFT || m === xe.RIGHT ? (f = Ve(h, c).multiply(0.5 * e.renderedSize.width - 1).add(l), p = Ve(h, -c).multiply(0.5 * e.renderedSize.height - 1).add(l).add(Ve(h, -c).multiply(2 * t.markerBoxSize))) : (f = Ve(h, c).multiply(0.5 * e.renderedSize.height - 1).add(l), p = Ve(h, -c).multiply(0.5 * e.renderedSize.width - 1).add(l).add(Ve(h, -c).multiply(2 * t.markerBoxSize)));
    return `M${f.get(0, 0)},${f.get(0, 1)} A${g},${v}, 0, 1, 0, ${p.get(0, 0)},${p.get(0, 1)}`;
  } else
    return "";
}
function nc(e, t) {
  if (e.props.shape === ue.RECTANGLE && e.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, l, a = 0.5 * e.renderedSize.width, h = 0.5 * e.renderedSize.height;
    e.renderedSize.width > e.renderedSize.height ? (e.props.reflexiveEdgeStart === xe.TOPLEFT || e.props.reflexiveEdgeStart === xe.BOTTOMRIGHT) && (a = e.renderedSize.width / e.renderedSize.height + e.renderedSize.height) : e.renderedSize.height > e.renderedSize.width && (e.props.reflexiveEdgeStart === xe.TOPRIGHT || e.props.reflexiveEdgeStart === xe.BOTTOMLEFT) && (h = e.renderedSize.height / e.renderedSize.width + e.renderedSize.width);
    let c = os(
      e.props.reflexiveEdgeStart,
      e,
      t
    );
    return n = c.start, l = c.end, `M${n.get(0, 0)},${n.get(0, 1)} A${a},${h}, 0, 1, 0, ${l.get(0, 0)},${l.get(0, 1)}`;
  } else
    return "";
}
function Qn(e, t, n, l, a, h, c = 0) {
  const f = e - 0.5 * n, p = e + 0.5 * n, g = t - 0.5 * l, v = t + 0.5 * l;
  a === 0 && (a = Number.EPSILON), h === 0 && (h = Number.EPSILON);
  const m = a < 0 ? f : p, x = h < 0 ? g : v, R = (m - e) / a, P = (x - t) / h, F = Math.min(R, P);
  let A = e + F * a, M = t + F * h;
  if (c !== 0)
    if (R < P) {
      let D;
      m === f ? D = 1 : D = -1, A = A + c * D;
    } else {
      let D;
      x === g ? D = 1 : D = -1, M = M + c * D;
    }
  return { x: A, y: M };
}
function rc(e, t, n = 30) {
  let l = ic(Math.atan2(e, t));
  return l < 0 && (l += 360), $t(l, 0, n) ? xe.BOTTOMLEFT : $t(l, [0, 90], -n) ? xe.BOTTOM : $t(l, 90, n) ? xe.BOTTOMRIGHT : $t(l, [90, 180], -n) ? xe.RIGHT : $t(l, 180, n) ? xe.TOPRIGHT : $t(l, [180, 270], -n) ? xe.TOP : $t(l, 270, n) ? xe.TOPLEFT : xe.LEFT;
}
function os(e, t, n) {
  const l = t.x, a = t.y, h = 0.5 * t.renderedSize.width, c = 0.5 * t.renderedSize.height, f = n.markerBoxSize, p = {
    [xe.BOTTOMLEFT]: {
      start: [l - h + 2, a + c - 1],
      end: [l + h - 2 * f, a + c + 2 * f]
    },
    [xe.BOTTOM]: {
      start: [l, a + c - 1],
      end: [l + h + 2 * f, a]
    },
    [xe.BOTTOMRIGHT]: {
      start: [l + h - 2, a + c - 1],
      end: [l + h + 2 * f, a - c + 2 * f]
    },
    [xe.RIGHT]: {
      start: [l + h - 1, a],
      end: [l, a - c - 2 * f]
    },
    [xe.TOPRIGHT]: {
      start: [l + h - 2, a - c + 1],
      end: [l - h + 2 * f, a - c - 2 * f]
    },
    [xe.TOP]: {
      start: [l, a - c + 1],
      end: [l - h - 2 * f, a]
    },
    [xe.TOPLEFT]: {
      start: [l - h + 2, a - c + 1],
      end: [l - h - 2 * f, a + c - 2 * f]
    },
    [xe.LEFT]: {
      start: [l - h + 1, a],
      end: [l, a + c + 2 * f]
    }
  }, { start: g, end: v } = p[e];
  return {
    start: new nt([g]),
    end: new nt([v])
  };
}
function $t(e, t, n = 0) {
  e = (e + 360) % 360;
  let l, a;
  return typeof t == "number" ? (l = (t - n + 360) % 360, a = (t + n) % 360) : (l = (t[0] - n + 360) % 360, a = (t[1] + n) % 360), l < a ? e >= l && e <= a : e >= l || e <= a;
}
function qt(e) {
  return e * (Math.PI / 180);
}
function ic(e) {
  return e * (180 / Math.PI);
}
function Ve(e, t) {
  const n = e.get(0, 0), l = e.get(0, 1);
  return new nt([
    [
      n * Math.cos(t) - l * Math.sin(t),
      n * Math.sin(t) + l * Math.cos(t)
    ]
  ]);
}
function sc(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((f) => f.trim().startsWith("#")), l = n !== -1 ? t.slice(0, n) : t, a = n !== -1 ? t.slice(n + 1) : [], h = [];
  if (l.length)
    for (const f of l) {
      let [, p, g, v] = (f.match(/(\w+) (.*) \/COLOR:\/(.+)/) || f.match(/(\w+) (.*)/) || f.match(/(\w+)/) || []).map((m) => m.trim());
      g?.includes("/COLOR:/") && (v = g, g = ""), p && h.push({
        idImported: p,
        label: g,
        color: v?.replace("/COLOR:/", "")
      });
    }
  const c = [];
  if (a.length)
    for (const f of a) {
      let [, p, g, v, m] = (f.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || f.match(/(\w+) (\w+) (.*)/) || f.match(/(\w+) (\w+)/) || []).map((x) => x.trim());
      v?.includes("/COLOR:/") && (m = v, v = ""), p && g && c.push({
        sourceIdImported: p,
        targetIdImported: g,
        label: v,
        color: m?.replace("/COLOR:/", "")
      });
    }
  return [h, c];
}
function oc(e) {
  const t = [];
  for (let l of e.nodes)
    t.push({
      idImported: l.id,
      x: l.x,
      y: l.y,
      label: l.label,
      props: l.props,
      color: l.color,
      fixedPosition: l.fixedPosition,
      deletable: l.deletable,
      labelEditable: l.labelEditable,
      allowIncomingLinks: l.allowIncomingLinks,
      allowOutgoingLinks: l.allowOutgoingLinks
    });
  const n = [];
  for (let l of e.links)
    n.push({
      sourceIdImported: l.sourceId,
      targetIdImported: l.targetId,
      label: l.label,
      color: l.color,
      deletable: l.deletable,
      labelEditable: l.labelEditable
    });
  return [t, n];
}
const lc = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  "Pale Moon": "pale_moon",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
}, ls = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  pale_moon: "Pale Moon",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
}, Pe = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv",
  bot: "bot"
}, Ge = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
}, Nt = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class X {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(t, n) {
    const l = n.match(t);
    return l && l.length > 0 && l[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(t, n) {
    const l = n.match(t);
    return l && l.length > 1 && l[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(t, n, l) {
    if (t.test(n))
      return l;
  }
  static getWindowsVersionName(t) {
    switch (t) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(t) {
    const n = t.split(".").splice(0, 2).map((l) => parseInt(l, 10) || 0);
    if (n.push(0), n[0] === 10)
      switch (n[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(t) {
    const n = t.split(".").splice(0, 2).map((l) => parseInt(l, 10) || 0);
    if (n.push(0), !(n[0] === 1 && n[1] < 5)) {
      if (n[0] === 1 && n[1] < 6) return "Cupcake";
      if (n[0] === 1 && n[1] >= 6) return "Donut";
      if (n[0] === 2 && n[1] < 2) return "Eclair";
      if (n[0] === 2 && n[1] === 2) return "Froyo";
      if (n[0] === 2 && n[1] > 2) return "Gingerbread";
      if (n[0] === 3) return "Honeycomb";
      if (n[0] === 4 && n[1] < 1) return "Ice Cream Sandwich";
      if (n[0] === 4 && n[1] < 4) return "Jelly Bean";
      if (n[0] === 4 && n[1] >= 4) return "KitKat";
      if (n[0] === 5) return "Lollipop";
      if (n[0] === 6) return "Marshmallow";
      if (n[0] === 7) return "Nougat";
      if (n[0] === 8) return "Oreo";
      if (n[0] === 9) return "Pie";
    }
  }
  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(t) {
    return t.split(".").length;
  }
  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(t, n, l = !1) {
    const a = X.getVersionPrecision(t), h = X.getVersionPrecision(n);
    let c = Math.max(a, h), f = 0;
    const p = X.map([t, n], (g) => {
      const v = c - X.getVersionPrecision(g), m = g + new Array(v + 1).join(".0");
      return X.map(m.split("."), (x) => new Array(20 - x.length).join("0") + x).reverse();
    });
    for (l && (f = c - Math.min(a, h)), c -= 1; c >= f; ) {
      if (p[0][c] > p[1][c])
        return 1;
      if (p[0][c] === p[1][c]) {
        if (c === f)
          return 0;
        c -= 1;
      } else if (p[0][c] < p[1][c])
        return -1;
    }
  }
  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(t, n) {
    const l = [];
    let a;
    if (Array.prototype.map)
      return Array.prototype.map.call(t, n);
    for (a = 0; a < t.length; a += 1)
      l.push(n(t[a]));
    return l;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(t, n) {
    let l, a;
    if (Array.prototype.find)
      return Array.prototype.find.call(t, n);
    for (l = 0, a = t.length; l < a; l += 1) {
      const h = t[l];
      if (n(h, l))
        return h;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(t, ...n) {
    const l = t;
    let a, h;
    if (Object.assign)
      return Object.assign(t, ...n);
    for (a = 0, h = n.length; a < h; a += 1) {
      const c = n[a];
      typeof c == "object" && c !== null && Object.keys(c).forEach((p) => {
        l[p] = c[p];
      });
    }
    return t;
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(t) {
    return lc[t];
  }
  /**
   * Get browser name for a short version/alias
   *
   * @example
   *   getBrowserTypeByAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(t) {
    return ls[t] || "";
  }
}
const Me = /version\/(\d+(\.?_?\d+)+)/i, ac = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      }, n = X.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = X.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/PaleMoon/i],
    describe(e) {
      const t = {
        name: "Pale Moon"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      }, n = X.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      }, n = X.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      }, n = X.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      }, n = X.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      }, n = X.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      }, n = X.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      }, n = X.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/msie|trident/i],
    describe(e) {
      const t = {
        name: "Internet Explorer"
      }, n = X.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/\sedg\//i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = X.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(e) {
      const t = {
        name: "Microsoft Edge"
      }, n = X.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/vivaldi/i],
    describe(e) {
      const t = {
        name: "Vivaldi"
      }, n = X.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/seamonkey/i],
    describe(e) {
      const t = {
        name: "SeaMonkey"
      }, n = X.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sailfish/i],
    describe(e) {
      const t = {
        name: "Sailfish"
      }, n = X.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/silk/i],
    describe(e) {
      const t = {
        name: "Amazon Silk"
      }, n = X.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/phantom/i],
    describe(e) {
      const t = {
        name: "PhantomJS"
      }, n = X.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/slimerjs/i],
    describe(e) {
      const t = {
        name: "SlimerJS"
      }, n = X.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = {
        name: "BlackBerry"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      }, n = X.getFirstMatch(Me, e) || X.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/bada/i],
    describe(e) {
      const t = {
        name: "Bada"
      }, n = X.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/tizen/i],
    describe(e) {
      const t = {
        name: "Tizen"
      }, n = X.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      }, n = X.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(e) {
      const t = {
        name: "Firefox"
      }, n = X.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/electron/i],
    describe(e) {
      const t = {
        name: "Electron"
      }, n = X.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(e) {
      const t = {
        name: "Miui"
      }, n = X.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chromium/i],
    describe(e) {
      const t = {
        name: "Chromium"
      }, n = X.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(e) {
      const t = {
        name: "Chrome"
      }, n = X.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/GSA/i],
    describe(e) {
      const t = {
        name: "Google Search"
      }, n = X.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Android Browser */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = {
        name: "Android Browser"
      }, n = X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      }, n = X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      }, n = X.getFirstMatch(Me, e);
      return n && (t.version = n), t;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(e) {
      const t = /^(.*)\/(.*) /, n = /^(.*)\/(.*)[ \t]\((.*)/, a = e.search("\\(") !== -1 ? n : t;
      return {
        name: X.getFirstMatch(a, e),
        version: X.getSecondMatch(a, e)
      };
    }
  }
], uc = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(e) {
      const t = X.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
      return {
        name: Ge.Roku,
        version: t
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(e) {
      const t = X.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
      return {
        name: Ge.WindowsPhone,
        version: t
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(e) {
      const t = X.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), n = X.getWindowsVersionName(t);
      return {
        name: Ge.Windows,
        version: t,
        versionName: n
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(e) {
      const t = {
        name: Ge.iOS
      }, n = X.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
      return n && (t.version = n), t;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(e) {
      const t = X.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), n = X.getMacOSVersionName(t), l = {
        name: Ge.MacOS,
        version: t
      };
      return n && (l.versionName = n), l;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(e) {
      const t = X.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
      return {
        name: Ge.iOS,
        version: t
      };
    }
  },
  /* Android */
  {
    test(e) {
      const t = !e.test(/like android/i), n = e.test(/android/i);
      return t && n;
    },
    describe(e) {
      const t = X.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), n = X.getAndroidVersionName(t), l = {
        name: Ge.Android,
        version: t
      };
      return n && (l.versionName = n), l;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = X.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), n = {
        name: Ge.WebOS
      };
      return t && t.length && (n.version = t), n;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(e) {
      const t = X.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || X.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || X.getFirstMatch(/\bbb(\d+)/i, e);
      return {
        name: Ge.BlackBerry,
        version: t
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(e) {
      const t = X.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
      return {
        name: Ge.Bada,
        version: t
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(e) {
      const t = X.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: Ge.Tizen,
        version: t
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: Ge.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: Ge.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(e) {
      const t = X.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
      return {
        name: Ge.PlayStation4,
        version: t
      };
    }
  }
], hc = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: Pe.bot,
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(e) {
      const t = X.getFirstMatch(/(can-l01)/i, e) && "Nova", n = {
        type: Pe.mobile,
        vendor: "Huawei"
      };
      return t && (n.model = t), n;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: Pe.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Pe.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(e) {
      const t = e.test(/ipod|iphone/i), n = e.test(/like (ipod|iphone)/i);
      return t && !n;
    },
    describe(e) {
      const t = X.getFirstMatch(/(ipod|iphone)/i, e);
      return {
        type: Pe.mobile,
        vendor: "Apple",
        model: t
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: Pe.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Nokia */
  {
    test: [/Nokia/i],
    describe(e) {
      const t = X.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, e), n = {
        type: Pe.mobile,
        vendor: "Nokia"
      };
      return t && (n.model = t), n;
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(e) {
      return e.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: Pe.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(e) {
      return e.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(e) {
      return e.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: Pe.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(e) {
      const t = Number(String(e.getOSVersion()).split(".")[0]);
      return e.getOSName(!0) === "android" && t >= 3;
    },
    describe() {
      return {
        type: Pe.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(e) {
      return e.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: Pe.mobile
      };
    }
  },
  /* desktop */
  {
    test(e) {
      return e.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: Pe.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(e) {
      return e.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: Pe.desktop
      };
    }
  },
  /* Linux */
  {
    test(e) {
      return e.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: Pe.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(e) {
      return e.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: Pe.tv
      };
    }
  },
  /* Roku */
  {
    test(e) {
      return e.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: Pe.tv
      };
    }
  }
], cc = [
  /* EdgeHTML */
  {
    test(e) {
      return e.getBrowserName(!0) === "microsoft edge";
    },
    describe(e) {
      if (/\sedg\//i.test(e))
        return {
          name: Nt.Blink
        };
      const n = X.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
      return {
        name: Nt.EdgeHTML,
        version: n
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(e) {
      const t = {
        name: Nt.Trident
      }, n = X.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Presto */
  {
    test(e) {
      return e.test(/presto/i);
    },
    describe(e) {
      const t = {
        name: Nt.Presto
      }, n = X.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Gecko */
  {
    test(e) {
      const t = e.test(/gecko/i), n = e.test(/like gecko/i);
      return t && !n;
    },
    describe(e) {
      const t = {
        name: Nt.Gecko
      }, n = X.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: Nt.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(e) {
      const t = {
        name: Nt.WebKit
      }, n = X.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  }
];
class yi {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(t, n = !1) {
    if (t == null || t === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = t, this.parsedResult = {}, n !== !0 && this.parse();
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }
  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(t) {
    return t.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = X.find(ac, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((l) => this.test(l));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
  }
  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(t) {
    return t ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};
    const t = X.find(uc, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((l) => this.test(l));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(t) {
    const { name: n } = this.getOS();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(t = !1) {
    const { type: n } = this.getPlatform();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = X.find(hc, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((l) => this.test(l));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
  }
  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(t) {
    return t ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const t = X.find(cc, (n) => {
      if (typeof n.test == "function")
        return n.test(this);
      if (Array.isArray(n.test))
        return n.test.some((l) => this.test(l));
      throw new Error("Browser's test function is not valid");
    });
    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
  }
  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return X.assign({}, this.parsedResult);
  }
  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(t) {
    const n = {};
    let l = 0;
    const a = {};
    let h = 0;
    if (Object.keys(t).forEach((f) => {
      const p = t[f];
      typeof p == "string" ? (a[f] = p, h += 1) : typeof p == "object" && (n[f] = p, l += 1);
    }), l > 0) {
      const f = Object.keys(n), p = X.find(f, (v) => this.isOS(v));
      if (p) {
        const v = this.satisfies(n[p]);
        if (v !== void 0)
          return v;
      }
      const g = X.find(
        f,
        (v) => this.isPlatform(v)
      );
      if (g) {
        const v = this.satisfies(n[g]);
        if (v !== void 0)
          return v;
      }
    }
    if (h > 0) {
      const f = Object.keys(a), p = X.find(f, (g) => this.isBrowser(g, !0));
      if (p !== void 0)
        return this.compareVersion(a[p]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param {string} browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(t, n = !1) {
    const l = this.getBrowserName().toLowerCase();
    let a = t.toLowerCase();
    const h = X.getBrowserTypeByAlias(a);
    return n && h && (a = h.toLowerCase()), a === l;
  }
  compareVersion(t) {
    let n = [0], l = t, a = !1;
    const h = this.getBrowserVersion();
    if (typeof h == "string")
      return t[0] === ">" || t[0] === "<" ? (l = t.substr(1), t[1] === "=" ? (a = !0, l = t.substr(2)) : n = [], t[0] === ">" ? n.push(1) : n.push(-1)) : t[0] === "=" ? l = t.substr(1) : t[0] === "~" && (a = !0, l = t.substr(1)), n.indexOf(
        X.compareVersions(h, l, a)
      ) > -1;
  }
  /**
   * Check if the OS name equals the passed string
   * @param {string} osName The string to compare with the OS name
   * @returns {boolean}
   */
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase();
  }
  /**
   * Check if the platform type equals the passed string
   * @param {string} platformType The string to compare with the platform type
   * @returns {boolean}
   */
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase();
  }
  /**
   * Check if the engine name equals the passed string
   * @param {string} engineName The string to compare with the engine name
   * @returns {boolean}
   */
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(t, n = !1) {
    return this.isBrowser(t, n) || this.isOS(t) || this.isPlatform(t);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(t = []) {
    return t.some((n) => this.is(n));
  }
}
class fc {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(t, n = !1) {
    if (typeof t != "string")
      throw new Error("UserAgent should be a string");
    return new yi(t, n);
  }
  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(t) {
    return new yi(t).getResult();
  }
  static get BROWSER_MAP() {
    return ls;
  }
  static get ENGINE_MAP() {
    return Nt;
  }
  static get OS_MAP() {
    return Ge;
  }
  static get PLATFORMS_MAP() {
    return Pe;
  }
}
const gc = /* @__PURE__ */ vi({
  __name: "GraphComponent",
  emits: ["nodeCreated", "nodeClicked", "nodeDeleted", "nodeRenderedSizeChange", "linkCreated", "linkClicked", "linkDeleted", "labelEdited"],
  setup(e, { expose: t, emit: n }) {
    const l = Br(() => {
      const y = document.querySelectorAll("graph-component");
      let E;
      for (let L = 0; L < y.length; L++) {
        const w = y[L], N = _e(w.shadowRoot);
        let O;
        if (N.empty() ? O = _e(
          ".graph-controller__graph-host.uninitialised"
        ) : O = N.select(
          ".graph-controller__graph-host.uninitialised"
        ), !O.empty()) {
          O.classed("uninitialised", !1), E = O;
          break;
        }
      }
      return E === void 0 && (E = _e(
        ".graph-controller__graph-host.uninitialised"
      ), E.classed("uninitialised", !1)), E;
    }), a = Br(() => {
      let y = l.value.node().parentElement;
      y || (y = l.value.node().getRootNode().host);
      let E = y.getAttribute("id");
      return E || "gc";
    });
    ws(() => {
      Yt(), window.addEventListener("resize", me);
    }), ys(() => {
      window.removeEventListener("resize", me);
    });
    const c = fc.getParser(window.navigator.userAgent).getPlatformType(!0);
    let f = !1, p = { x: -1e5, y: -1e5 };
    const g = jr(new ci()), v = jr(!1), m = vs(new hh());
    let x, R = 400, P = 400, F, A, M, D, q, I, V, K, ee, le = 0, de = 0, H = 1, ce, ve, re;
    const z = n;
    t({
      setDefaults: Z,
      getDefaults: W,
      getGraph: ie,
      setGraph: oe,
      printGraph: he,
      createNode: ft,
      createLink: It,
      deleteElement: fe,
      setLabel: we,
      setColor: ne,
      setNodeSize: Ce,
      setNodeShape: ke,
      setNodeProps: Q,
      setDeletable: Ne,
      setLabelEditable: Re,
      setNodesLinkPermission: Ee,
      setNodesFixedPosition: Be,
      setEditability: yt,
      toggleNodeLabels: wn,
      toggleLinkLabels: Rt,
      toggleZoom: Ct,
      toggleNodePhysics: ct,
      toggleFixedLinkDistance: Tt,
      toggleNodeCreationViaGUI: yn,
      toggleNodeAutoGrow: vn,
      resetView: ge
    });
    function Z(y) {
      y.zoomEnabled !== void 0 && Ct(y.zoomEnabled), y.nodePhysicsEnabled !== void 0 && ct(y.nodePhysicsEnabled), y.fixedLinkDistanceEnabled !== void 0 && Tt(y.fixedLinkDistanceEnabled), y.showNodeLabels !== void 0 && wn(y.showNodeLabels), y.showLinkLabels !== void 0 && Rt(y.showLinkLabels), y.nodeAutoGrowToLabelSize !== void 0 && vn(y.nodeAutoGrowToLabelSize), y.allowNodeCreationViaGUI !== void 0 && yn(y.allowNodeCreationViaGUI), m.nodeProps = y.nodeProps ?? m.nodeProps, m.nodeGUIEditability = y.nodeGUIEditability ?? m.nodeGUIEditability, m.linkGUIEditability = y.linkGUIEditability ?? m.linkGUIEditability, $e();
    }
    function W() {
      return {
        zoomEnabled: m.zoomEnabled,
        nodePhysicsEnabled: m.nodePhysicsEnabled,
        fixedLinkDistanceEnabled: m.fixedLinkDistanceEnabled,
        showNodeLabels: m.showNodeLabels,
        showLinkLabels: m.showLinkLabels,
        allowNodeCreationViaGUI: m.allowNodeCreationViaGUI,
        nodeAutoGrowToLabelSize: m.nodeAutoGrowToLabelSize,
        nodeProps: m.nodeProps,
        nodeGUIEditability: m.nodeGUIEditability,
        linkGUIEditability: m.linkGUIEditability
      };
    }
    function ie(y = "json", E = !0, L = !0, w = !0, N = !0) {
      if (y.toLowerCase() === "json")
        return JSON.parse(
          g.value.toJSON(
            E,
            m.showNodeLabels,
            m.showLinkLabels,
            L,
            w,
            w,
            N,
            N
          )
        );
      if (y.toLowerCase() === "tgf")
        return g.value.toTGF(m.showNodeLabels, m.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function oe(y) {
      typeof y == "object" || typeof y == "string" ? C(y) : Le();
    }
    function he(y = "json", E = !0, L = !0, w = !0, N = !0) {
      y.toLowerCase() === "json" ? console.log(
        g.value.toJSON(
          E,
          m.showNodeLabels,
          m.showLinkLabels,
          L,
          w,
          w,
          N,
          N
        )
      ) : console.log(g.value.toTGF(m.showNodeLabels, m.showLinkLabels));
    }
    function fe(y) {
      if (y !== void 0) {
        const [E, L] = lt(y);
        for (const w of E)
          q.filter((N) => N.id === w).each(function(N) {
            let O = g.value.removeNode(N);
            if (O !== void 0) {
              let [B, pe] = O;
              z("nodeDeleted", {
                id: B.id,
                label: B.label,
                x: B.x,
                y: B.y
              }), pe.forEach((ae) => {
                z("linkDeleted", { id: ae.id, label: ae.label });
              });
            }
          });
        for (const w of L)
          D.filter((N) => N.id === w).each(function(N) {
            let O = g.value.removeLink(N);
            O !== void 0 && z("linkDeleted", { id: O.id, label: O.label });
          });
      } else
        q.each(function(E) {
          let L = g.value.removeNode(E);
          if (L !== void 0) {
            let [w, N] = L;
            z("nodeDeleted", {
              id: w.id,
              label: w.label,
              x: w.x,
              y: w.y
            }), N.forEach((O) => {
              z("linkDeleted", { id: O.id, label: O.label });
            });
          }
        }), D.each(function(E) {
          let L = g.value.removeLink(E);
          L !== void 0 && z("linkDeleted", { id: L.id, label: L.label });
        });
      v.value = g.value.nodes.length > 0, $e();
    }
    function we(y, E) {
      if (E !== void 0) {
        const [L, w] = lt(E);
        for (const N of L)
          q.filter((O) => O.id === N).each((O) => {
            G(O, y);
          });
        for (const N of w)
          D.filter((O) => O.id === N).each((O) => {
            G(O, y);
          });
      } else
        q.each((L) => {
          G(L, y);
        }), D.each((L) => {
          G(L, y);
        });
    }
    function ne(y, E) {
      if (E !== void 0) {
        const [L, w] = lt(E);
        se(w);
        for (const N of L)
          q.selectAll(".graph-controller__node").filter((O) => O.id === N).each((O) => O.color = y).style("fill", y);
        for (const N of w)
          D.selectAll(".graph-controller__link").filter((O) => O.id === N).each((O) => O.color = y).style("stroke", y);
      } else
        q.selectAll(".graph-controller__node").each((L) => L.color = y).style("fill", y), se(g.value.links.map((L) => L.id)), D.selectAll(".graph-controller__link").each((L) => L.color = y).style("stroke", y);
      On(M, a.value, m, y), $e();
    }
    function Ce(y, E) {
      if (E !== void 0) {
        const [L] = lt(E);
        for (const w of L)
          q.filter((N) => N.id === w).each(function(N) {
            let O, B;
            m.nodeAutoGrowToLabelSize && (O = _e(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof y == "number" ? (N.setSize(y, m), m.nodeAutoGrowToLabelSize && O ? B = O : B = { width: 0, height: 0 }, ze(N, B)) : N.props.shape === ue.CIRCLE && Mt(["radius"], Object.keys(y), !0) ? (N.setSize(y, m), m.nodeAutoGrowToLabelSize && O ? B = O : B = { width: 0, height: 0 }, ze(N, B)) : N.props.shape === ue.RECTANGLE && Mt(["width", "height"], Object.keys(y), !0) && (N.setSize(y, m), m.nodeAutoGrowToLabelSize && O ? B = O : B = { width: 0, height: 0 }, ze(N, B));
          });
      } else
        q.each(function(L) {
          let w, N;
          m.nodeAutoGrowToLabelSize && (w = _e(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof y == "number" ? (L.setSize(y, m), m.nodeAutoGrowToLabelSize && w ? N = w : N = { width: 0, height: 0 }, ze(L, N)) : L.props.shape === ue.CIRCLE && Mt(["radius"], Object.keys(y), !1) ? (L.setSize(y, m), m.nodeAutoGrowToLabelSize && w ? N = w : N = { width: 0, height: 0 }, ze(L, N)) : L.props.shape === ue.RECTANGLE && Mt(["width", "height"], Object.keys(y), !1) && (L.setSize(y, m), m.nodeAutoGrowToLabelSize && w ? N = w : N = { width: 0, height: 0 }, ze(L, N));
        });
      $e();
    }
    function ke(y, E) {
      if (E !== void 0) {
        const [L] = lt(E);
        for (const w of L)
          q.filter((N) => N.id === w).each(function(N) {
            if (N.props.shape !== y) {
              let O, B;
              m.nodeAutoGrowToLabelSize && (O = _e(this).select("foreignObject").select("div").node(), B = O.getBoundingClientRect()), N.setShape(y, m), m.nodeAutoGrowToLabelSize && B && ze(N, B);
            }
          });
      } else
        q.each(function(L) {
          if (L.props.shape !== y) {
            let w, N;
            m.nodeAutoGrowToLabelSize && (w = _e(this).select("foreignObject").select("div").node(), N = w.getBoundingClientRect()), L.setShape(y, m), m.nodeAutoGrowToLabelSize && N && ze(L, N);
          }
        });
      $e();
    }
    function Q(y, E) {
      if (Mt(["shape"], Object.keys(y), !1)) {
        let L;
        if (E !== void 0 ? [L] = lt(E) : L = void 0, y.shape === ue.CIRCLE) {
          const w = ["shape", "radius"];
          if (Mt(w, Object.keys(y), !0))
            if (L !== void 0)
              for (const N of L)
                q.filter((O) => O.id === N).each(function(O) {
                  O.props = y;
                  let B;
                  if (m.nodeAutoGrowToLabelSize) {
                    let pe, ae;
                    pe = _e(this).select("foreignObject").select("div").node(), ae = pe.getBoundingClientRect(), B = ae;
                  } else
                    B = { width: 0, height: 0 };
                  ze(O, B);
                });
            else
              q.each(function(N) {
                N.props = y;
                let O;
                if (m.nodeAutoGrowToLabelSize) {
                  let B, pe;
                  B = _e(this).select("foreignObject").select("div").node(), pe = B.getBoundingClientRect(), O = pe;
                } else
                  O = { width: 0, height: 0 };
                ze(N, O);
              });
          rn(w, Object.keys(y));
        } else if (y.shape === ue.RECTANGLE) {
          const w = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (Mt(w, Object.keys(y), !0)) {
            if (Object.values(xe).includes(y.reflexiveEdgeStart) || y.reflexiveEdgeStart === "MOVABLE")
              if (L !== void 0)
                for (const N of L)
                  q.filter((O) => O.id === N).each(function(O) {
                    O.props = y;
                    let B;
                    if (m.nodeAutoGrowToLabelSize) {
                      let pe, ae;
                      pe = _e(this).select("foreignObject").select("div").node(), ae = pe.getBoundingClientRect(), B = ae;
                    } else
                      B = { width: 0, height: 0 };
                    ze(O, B);
                  });
              else
                q.each(function(N) {
                  N.props = y;
                  let O;
                  if (m.nodeAutoGrowToLabelSize) {
                    let B, pe;
                    B = _e(this).select("foreignObject").select("div").node(), pe = B.getBoundingClientRect(), O = pe;
                  } else
                    O = { width: 0, height: 0 };
                  ze(N, O);
                });
          } else
            Vt(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          rn(w, Object.keys(y));
        }
        $e();
      } else
        Vt(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function Ne(y, E) {
      if (E !== void 0) {
        const [L, w] = lt(E);
        for (const N of L)
          q.filter((O) => O.id === N).each((O) => {
            O.deletable = y;
          });
        for (const N of w)
          D.filter((O) => O.id === N).each((O) => {
            O.deletable = y;
          });
      } else
        q.each((L) => {
          L.deletable = y;
        }), D.each((L) => {
          L.deletable = y;
        });
    }
    function Re(y, E) {
      if (E !== void 0) {
        const [L, w] = lt(E);
        for (const N of L)
          q.filter((O) => O.id === N).each((O) => {
            O.labelEditable = y;
          });
        for (const N of w)
          D.filter((O) => O.id === N).each((O) => {
            O.labelEditable = y;
          });
      } else
        q.each((L) => {
          L.labelEditable = y;
        }), D.each((L) => {
          L.labelEditable = y;
        });
    }
    function Ee(y, E, L) {
      if (L !== void 0) {
        const [w] = lt(L);
        for (const N of w)
          q.filter((O) => O.id === N).each((O) => {
            O.allowIncomingLinks = y, O.allowOutgoingLinks = E;
          });
      } else
        q.each((w) => {
          w.allowIncomingLinks = y, w.allowOutgoingLinks = E;
        });
    }
    function Be(y, E) {
      if (E !== void 0) {
        const [L] = lt(E);
        for (const w of L)
          q.filter((N) => N.id === w).each((N) => {
            Tn(N, y);
          });
      } else
        q.each((L) => {
          Tn(L, y);
        });
    }
    function yt(y, E) {
      const L = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], w = ["deletable", "labelEditable"];
      if (E !== void 0) {
        const [N, O] = lt(E), B = N.length === 0;
        for (const pe of N)
          q.filter((ae) => ae.id === pe).each(function(ae) {
            ae.deletable = y.deletable ?? ae.deletable, ae.labelEditable = y.labelEditable ?? ae.labelEditable, "fixedPosition" in y && Tn(ae, y.fixedPosition), "allowIncomingLinks" in y && (ae.allowIncomingLinks = y.allowIncomingLinks ?? ae.allowIncomingLinks), "allowOutgoingLinks" in y && (ae.allowOutgoingLinks = y.allowOutgoingLinks ?? ae.allowOutgoingLinks);
          });
        for (const pe of O)
          D.selectAll(".graph-controller__link").filter((ae) => ae.id === pe).each(function(ae) {
            ae.deletable = y.deletable ?? ae.deletable, ae.labelEditable = y.labelEditable ?? ae.labelEditable;
          });
        rn(
          B ? w : L,
          Object.keys(y)
        );
      } else
        q.each(function(N) {
          N.deletable = y.deletable ?? N.deletable, N.labelEditable = y.labelEditable ?? N.labelEditable, "fixedPosition" in y && Tn(N, y.fixedPosition), "allowIncomingLinks" in y && (N.allowIncomingLinks = y.allowIncomingLinks ?? N.allowIncomingLinks), "allowOutgoingLinks" in y && (N.allowOutgoingLinks = y.allowOutgoingLinks ?? N.allowOutgoingLinks);
        }), D.selectAll(".graph-controller__link").each(function(N) {
          N.deletable = y.deletable ?? N.deletable, N.labelEditable = y.labelEditable ?? N.labelEditable;
        }), rn(L, Object.keys(y));
      $e();
    }
    function ct(y) {
      m.nodePhysicsEnabled = y, es(x, y, R, P);
    }
    function Tt(y) {
      m.fixedLinkDistanceEnabled = y, ts(x, g.value, m, y);
    }
    function Rt(y) {
      m.showLinkLabels = y;
    }
    function wn(y) {
      m.showNodeLabels = y;
    }
    function Ct(y) {
      m.zoomEnabled = y, ge();
    }
    function yn(y) {
      m.allowNodeCreationViaGUI = y;
    }
    function vn(y) {
      m.nodeAutoGrowToLabelSize = y, y || (re.disconnect(), q.each(function(E) {
        ze(E, { width: 0, height: 0 });
      })), $e();
    }
    function Yt() {
      R = l.value.node().clientWidth, P = l.value.node().clientHeight, F = ah(
        (y) => st(y, m.zoomEnabled),
        m.zoomEnabled
      ), M = fh(
        l.value,
        F,
        (y) => m.allowNodeCreationViaGUI ? d(y) : null,
        (y) => m.allowNodeCreationViaGUI ? Pt(y) : null,
        (y) => {
          m.allowNodeCreationViaGUI && ft(
            { ...m.nodeProps },
            it(y, M.node())[0],
            it(y, M.node())[1]
          );
        }
      ), yh(M, a.value, m, g.value.getNonDefaultLinkColors()), I = vh(M), D = gh(M), q = ph(M), x = Ah(g.value, m, R, P, () => Hn()), A = ch(x, R, P, m), re = De(), $e();
    }
    function De() {
      return new ResizeObserver((y) => {
        let E = !1;
        for (let L of y) {
          const w = L;
          if (w && w.borderBoxSize[0] !== void 0) {
            const N = {
              width: w.borderBoxSize[0].inlineSize,
              height: w.borderBoxSize[0].blockSize
            }, B = _e(w.target).datum();
            E = ze(B, N);
          }
        }
        E && $e();
      });
    }
    function Kn() {
      l.value.node().querySelectorAll(
        ".graph-controller__node-label, .graph-controller__node-label-placeholder"
      ).forEach((E) => re.observe(E));
    }
    function ze(y, E) {
      let L = !1;
      const w = { ...y.renderedSize }, N = E.width > E.height ? E.width / 2 : E.height / 2, O = E.width, B = E.height;
      return y.renderedSize = { width: O, height: B, radius: N }, JSON.stringify(w) !== JSON.stringify(y.renderedSize) && (L = !0, z(
        "nodeRenderedSizeChange",
        { id: y.id, renderedSize: y.renderedSize, baseSize: y.getSize() },
        w
      )), L;
    }
    function st(y, E = !0) {
      E && (le = y.transform.x, de = y.transform.y, H = y.transform.k, M.attr("transform", `translate(${le},${de})scale(${H})`));
    }
    function It(y, E, L, w, N = m.linkGUIEditability.deletable, O = m.linkGUIEditability.labelEditable) {
      let B = g.value.createLink(
        y,
        E,
        L,
        w,
        N,
        O
      );
      if (B !== void 0)
        return B.color && On(M, a.value, m, B.color), z("linkCreated", { id: B.id, label: B.label }), $e(), B.id;
    }
    function ft(y = { ...m.nodeProps }, E, L, w, N, O, B = m.nodeGUIEditability.fixedPosition, pe = m.nodeGUIEditability.deletable, ae = m.nodeGUIEditability.labelEditable, Se = m.nodeGUIEditability.allowIncomingLinks, Te = m.nodeGUIEditability.allowOutgoingLinks) {
      let Ie = g.value.createNode(
        y,
        E ?? R / 2,
        L ?? P / 2,
        w,
        N,
        O,
        B,
        pe,
        ae,
        Se,
        Te
      );
      return z("nodeCreated", { id: Ie.id, label: Ie.label, x: Ie.x, y: Ie.y }), An(x, g.value, m), v.value = !0, $e(), Ie.id;
    }
    function Hn() {
      q.attr("transform", (y) => `translate(${y.x},${y.y})`), D.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (y) => (bn(y), Zh(y, R, P, m))), Jt();
    }
    function bn(y) {
      let E = y.pathType;
      y.pathType = Kh(y.source, y.target, g.value), E !== y.pathType && $e();
    }
    function Dt() {
      const y = V, E = _e(
        l.value.node().querySelector(`#${a.value + "-node-" + y.id}`)
      ).classed("on-deletion");
      if (y !== void 0 && !E) {
        const L = K;
        L !== void 0 ? I.attr("d", () => y.id === L.id ? ss(y, [R / 2, P / 2], m) : g.value.hasBidirectionalConnection(y, L) ? on(y, L, m) : kr(y, L, m)) : ee !== void 0 && I.attr(
          "d",
          on(y, { x: ee[0], y: ee[1] }, m)
        );
      }
    }
    function $e(y = 0.5) {
      D = D.data(g.value.links, (E) => E.id).join((E) => {
        const L = E.append("g").classed("graph-controller__link-container", !0);
        return L.append("path").classed("graph-controller__link", !0).style("stroke", (w) => w.color ? w.color : "").attr("id", (w) => a.value + "-link-" + w.id), L.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (w) => {
          et(w);
        }).on("pointerout", (w) => r(w)).on("pointerdown", (w, N) => {
          z("linkClicked", { id: N.id, label: N.label }, w.button), u(w, N);
        }).on("pointerup", (w, N) => {
          o(w, N);
        }), L.append("text").attr("class", (w) => `graph-controller__${w.pathType?.toLowerCase()}-path-text`).append("textPath").attr(
          "class",
          (w) => w.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (w) => `#${a.value + "-link-" + w.id}`).text((w) => w.label ? w.label : "add label").on("click", (w, N) => {
          $(w, N);
        }).on("dblclick", (w) => {
          et(w);
        }), L.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (w) => `<div class='${w.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (w, N) => {
          $(w, N);
        }).on("dblclick", (w) => {
          et(w);
        }), L;
      }), D.selectChild(".graph-controller__link").attr("marker-start", function(E) {
        if (E.pathType?.includes("REVERSE")) {
          let L = `url(#${a.value}-link-arrow-reverse`;
          return E.color && (L += "-" + fn(E.color)), L += ")", L;
        } else
          return null;
      }).attr("marker-end", function(E) {
        if (E.pathType?.includes("REVERSE"))
          return null;
        {
          let L = `url(#${a.value}-link-arrow`;
          return E.color && (L += "-" + fn(E.color)), L += ")", L;
        }
      }), D.selectChild("text").attr("class", (E) => `graph-controller__${E.pathType?.toLowerCase()}-path-text`).attr("dy", (E) => E.pathType === tt.REFLEXIVE ? 15 : E.pathType == tt.LINEREVERSE ? -10 : E.pathType?.includes("REVERSE") ? 20 : -10).selectChild("textPath").attr(
        "class",
        (E) => E.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (E) => !m.showLinkLabels || !E.label && !E.labelEditable).classed("not-editable", (E) => !E.labelEditable).attr("startOffset", (E) => E.pathType?.includes("REVERSE") ? "46%" : "50%").text((E) => E.label ? E.label : "add label"), q = q.data(g.value.nodes, (E) => E.id).join(
        (E) => {
          const L = E.append("g").classed("graph-controller__node-container", !0).call(A).on("dblclick", (w) => {
            et(w);
          }).on("pointerenter", (w, N) => i(N)).on("pointerout", (w, N) => s(N)).on("pointerdown", (w, N) => {
            z(
              "nodeClicked",
              { id: N.id, label: N.label, x: N.x, y: N.y },
              w.button
            ), p = { x: w.x, y: w.y }, ir(w, N);
          }).on("pointerup", (w, N) => {
            Pt(w, N);
          });
          return _n(L);
        },
        (E) => (E.each(function(L) {
          const w = _e(this), N = w.selectChild(".graph-controller__node").node();
          er(L, N) ? (tr(N, w), An(x, g.value, m)) : nr(w);
        }), E)
      ), q.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (E) => E.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("controls-node-size", m.nodeAutoGrowToLabelSize).classed("hidden", (E) => !m.showNodeLabels || !E.label && !E.labelEditable).classed("not-editable", (E) => !E.labelEditable).text((E) => E.label ? E.label : "add label"), window.MathJax?.version && window.MathJax.typesetPromise().then(() => {
        rr();
      }), m.nodeAutoGrowToLabelSize && Kn(), x.nodes(g.value.nodes), x.alpha(y).restart();
    }
    function er(y, E) {
      return y.props.shape === ue.CIRCLE && E.tagName !== "circle" || y.props.shape === ue.RECTANGLE && E.tagName !== "rect";
    }
    function tr(y, E) {
      m.nodeAutoGrowToLabelSize && re.unobserve(
        E.select(
          ".graph-controller__node-label, .graph-controller__node-label-placeholder"
        ).node()
      ), y.remove(), E.selectChild(".graph-controller__node-label-container").remove(), _n(E);
    }
    function _n(y) {
      y.filter((L) => L.props.shape === ue.CIRCLE).append(ue.CIRCLE).classed("graph-controller__node", !0).attr("id", (L) => `${a.value + "-node-" + L.id}`).attr("r", (L) => L.renderedSize.radius).style("fill", (L) => L.color ? L.color : ""), y.filter((L) => L.props.shape === ue.RECTANGLE).append(ue.RECTANGLE).classed("graph-controller__node", !0).attr("id", (L) => `${a.value + "-node-" + L.id}`).attr("width", (L) => L.renderedSize.width).attr("height", (L) => L.renderedSize.height).attr("x", (L) => -0.5 * L.renderedSize.width).attr("y", (L) => -0.5 * L.renderedSize.height).attr("rx", (L) => L.props.cornerRadius).attr("ry", (L) => L.props.cornerRadius).style("fill", (L) => L.color ? L.color : "");
      const E = y.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return E.filter((L) => L.props.shape === ue.CIRCLE).attr("width", (L) => 2 * L.renderedSize.radius).attr("height", (L) => 2 * L.renderedSize.radius).attr("x", (L) => -L.renderedSize.radius).attr("y", (L) => -L.renderedSize.radius), E.filter((L) => L.props.shape === ue.RECTANGLE).attr("width", (L) => L.renderedSize.width).attr("height", (L) => L.renderedSize.height).attr("x", (L) => -0.5 * L.renderedSize.width).attr("y", (L) => -0.5 * L.renderedSize.height), E.append("xhtml:div").on("click", (L, w) => {
        k(L, w);
      }).on("dblclick", (L) => {
        et(L);
      }).on("pointerenter", (L, w) => i(w)).on("pointerout", (L, w) => s(w)), y;
    }
    function nr(y) {
      y.selectChild(".graph-controller__node").filter((E) => E.props.shape === ue.CIRCLE).attr("r", (E) => E.renderedSize.radius), y.filter((E) => E.props.shape === ue.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (E) => 2 * E.renderedSize.radius).attr("height", (E) => 2 * E.renderedSize.radius).attr("x", (E) => -E.renderedSize.radius).attr("y", (E) => -E.renderedSize.radius), y.selectChild(".graph-controller__node").filter((E) => E.props.shape === ue.RECTANGLE).attr("width", (E) => E.renderedSize.width).attr("height", (E) => E.renderedSize.height).attr("x", (E) => -0.5 * E.renderedSize.width).attr("y", (E) => -0.5 * E.renderedSize.height).attr("rx", (E) => E.props?.cornerRadius).attr("ry", (E) => E.props?.cornerRadius), y.filter((E) => E.props.shape === ue.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (E) => E.renderedSize.width).attr("height", (E) => E.renderedSize.height).attr("x", (E) => -0.5 * E.renderedSize.width).attr("y", (E) => -0.5 * E.renderedSize.height);
    }
    function rr() {
      D.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(y) {
        const E = this, L = y, w = _e(E.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !m.showLinkLabels || !L.label && !L.labelEditable
        ).node();
        w.replaceChild(E, w.childNodes[0]);
      }), D.selectChild("text").selectChild("textPath").each(function() {
        const y = this;
        let E = !1;
        y.childNodes.forEach((w) => {
          w?.nodeType === Node.TEXT_NODE && w?.textContent?.trim() !== "" && (E = !0);
        }), E || _e(y).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), Jt();
    }
    function Jt() {
      D.selectChild("text").selectChild("textPath").each(function() {
        const y = this, [E, L] = U(y);
        _e(y.parentNode.parentNode).select("foreignObject").attr("x", E).attr("y", L);
      });
    }
    function ir(y, E) {
      (y.button === 2 || y.pointerType === "touch") && (hi(y), E.allowOutgoingLinks && or(E), E.deletable && (ce = setTimeout(() => {
        K = void 0, sr(E);
      }, 250)));
    }
    function sr(y) {
      let E = l.value.node().querySelector(`#${a.value + "-node-" + y.id}`);
      _e(E).classed("on-deletion", !0);
      let L = _e(E.parentElement);
      if (y.props.shape === ue.CIRCLE) {
        let w = Yu().outerRadius(y.props.radius + 4).innerRadius(y.props.radius), N = [{ startAngle: 0, endAngle: 0 }];
        L.append("g").attr("class", "arc").selectAll("path.arc").data(N).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(ri).attrTween("d", function(B) {
          let pe = { startAngle: 0, endAngle: 2 * Math.PI }, ae = Rr(B, pe);
          return function(Se) {
            return w(ae(Se));
          };
        }).on("end", () => xn(y));
      } else if (y.props.shape === ue.RECTANGLE) {
        const w = mh(
          y.renderedSize.width,
          y.renderedSize.height,
          y.props.cornerRadius
        );
        let N = L.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", w), O = 2 * y.renderedSize.width + 2 * y.renderedSize.height;
        N.attr("stroke-dasharray", O).attr("stroke-dashoffset", O).transition().duration(750).ease(ri).attr("stroke-dashoffset", 0).on("end", () => xn(y));
      }
    }
    function xn(y) {
      let E = g.value.removeNode(y);
      if (E !== void 0) {
        let [L, w] = E;
        z("nodeDeleted", {
          id: L.id,
          label: L.label,
          x: L.x,
          y: L.y
        }), w.forEach((N) => {
          z("linkDeleted", { id: N.id, label: N.label });
        }), An(x, g.value, m);
      }
      v.value = g.value.nodes.length > 0, te(), $e();
    }
    function or(y) {
      ee = [y.x, y.y], V = y, I.attr("marker-end", `url(#${a.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", on(y, { x: ee[0], y: ee[1] }, m));
    }
    function Pt(y, E = void 0) {
      et(y), clearTimeout(ce), E && Zt(E), y.pointerType === "mouse" || (y.pointerType === "touch" || y.pointerType === "pen") && !wh(
        { x: p.x, y: p.y },
        { x: y.x, y: y.y }
      ) ? Kt() : te();
    }
    function Zt(y) {
      let E = l.value.node().querySelector(`#${a.value + "-node-" + y.id}`), L = _e(E), w = _e(E.parentElement);
      y.props.shape === ue.CIRCLE ? (L.classed("on-deletion", !1), w.select("g.arc").select("path.arc").interrupt().remove(), w.select("g.arc").remove()) : y.props.shape === ue.RECTANGLE && (L.classed("on-deletion") && w.select("path").attr("stroke-dasharray", 2 * y.props.width + 2 * y.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * y.props.width + 2 * y.props.height).on("end", () => {
        w.select("path").remove();
      }), L.classed("on-deletion", !1));
    }
    function Kt() {
      const y = V, E = K;
      te(), !(y === void 0 || E === void 0) && It(y.id, E.id);
    }
    function d(y) {
      if (et(y), V !== void 0) {
        const E = cl(y, l.value.node())[0];
        E !== void 0 && (ee = [(E[0] - le) / H, (E[1] - de) / H], Dt());
      }
    }
    function i(y) {
      y.allowIncomingLinks && (K = y);
    }
    function s(y) {
      y && Zt(y), K = void 0, clearTimeout(ce);
    }
    function r(y) {
      et(y), clearTimeout(ve);
    }
    function o(y, E) {
      et(y), clearTimeout(ve), (y.button === 2 || y.pointerType === "touch") && E.deletable && S(E);
    }
    function u(y, E) {
      (y.button === 2 || y.pointerType === "touch") && (hi(y), E.deletable && (ve = setTimeout(() => {
        b(E);
      }, 250)));
    }
    function b(y) {
      let E = l.value.node().querySelector(`#${a.value + "-link-" + y.id}`);
      if (_e(E).classed("on-deletion", !0), E instanceof SVGPathElement) {
        let L = _e(E), w = E.getTotalLength(), N = E.parentElement.querySelector("text"), O = Array.from(N.classList).some(
          (ae) => ae.includes("reverse")
        ), B = 0, pe = O ? w : -w;
        L.attr("stroke-dasharray", w).attr("stroke-dashoffset", B).transition().duration(750).attr("stroke-dashoffset", pe).on("end", () => _(y));
      }
    }
    function _(y) {
      let E = y.color, L = g.value.removeLink(y);
      L !== void 0 && z("linkDeleted", { id: L.id, label: L.label }), E && (g.value.hasNonDefaultLinkColor(E) || fr(M, a.value, E)), $e();
    }
    function S(y) {
      let E = l.value.node().querySelector(`#${a.value + "-link-" + y.id}`);
      if (_e(E).classed("on-deletion") && E instanceof SVGPathElement) {
        let L = _e(E), w = E.getTotalLength();
        L.attr("stroke-dasharray", w).attr("stroke-dashoffset", w).transition().attr("stroke-dashoffset", 0).on("end", () => {
          L.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      _e(E).classed("on-deletion", !1);
    }
    function k(y, E) {
      et(y), E.labelEditable && T(E, [E.x, E.y]);
    }
    function $(y, E) {
      if (E.labelEditable) {
        let L = y.target, w;
        L.nodeName === "textPath" ? w = L : w = L.closest(".graph-controller__link-container").querySelector("textPath");
        let N = U(w);
        T(E, N);
      }
    }
    function T(y, E) {
      let L = y instanceof Xn ? "node" : "link";
      const w = document.createElement("input");
      w.setAttribute("class", "graph-controller__label-input"), w.setAttribute("id", `${L}-label-input-field`), y.label == null ? w.value = "" : w.value = y.label, w.placeholder = `Enter ${L} label`;
      const N = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      N.setAttribute("width", "100%"), N.setAttribute("height", "100%"), N.setAttribute("x", `${E[0] - 90}`), N.setAttribute("y", `${E[1] - 12}`), N.append(w), l.value.select("svg").select("g").node().append(N), w.focus(), c !== "desktop" && (f = !0), w.ondblclick = function(B) {
        et(B);
      };
      let O = !1;
      w.onkeyup = function(B) {
        B.key === "Enter" ? (O = !0, w.blur()) : B.key === "Escape" && (w.value = "", w.blur());
      }, w.onblur = function() {
        O && G(y, w.value.trim()), N.remove(), c !== "desktop" && (f = !1);
      };
    }
    function G(y, E) {
      z("labelEdited", { id: y.id }, E), y.label = E, $e();
      let L = y instanceof Xn ? "node" : "link";
      L === "link" ? J(y) : L === "node" && E !== "" && j(y);
    }
    function J(y) {
      const E = l.value.node().querySelector(
        `#${a.value + "-link-" + y.id}`
      ).parentElement;
      E.querySelector("mjx-container")?.remove(), E.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), $e();
    }
    function j(y) {
      const E = l.value.node().querySelector(`#${a.value + "-node-" + y.id}`).parentElement;
      if (E) {
        const L = E.parentElement;
        E.remove(), L.append(E);
      }
    }
    function U(y) {
      let E = l.value.select("svg").node().getBoundingClientRect(), L = y.getBoundingClientRect(), w = (L.x - E.x - le) / H, N = (L.y - E.y - de) / H;
      return [w, N];
    }
    function te() {
      I?.classed("hidden", !0).attr("marker-end", "null"), V = void 0, K = void 0, ee = void 0;
    }
    function C(y) {
      let E, L;
      try {
        if (typeof y == "string")
          [E, L] = sc(y);
        else if (typeof y == "object")
          [E, L] = oc(y);
        else {
          Vt("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (w) {
        Vt("Error during parsing:", `Invalid data format:
` + w);
        return;
      }
      Le(), Y(E, L);
    }
    function Y(y, E) {
      for (let w of y)
        ft(
          w.props ?? m.nodeProps,
          w.x,
          w.y,
          w.idImported,
          w.label,
          w.color,
          w.fixedPosition,
          w.deletable,
          w.labelEditable,
          w.allowIncomingLinks,
          w.allowOutgoingLinks
        );
      const L = (w) => g.value.nodes.find((N) => N.idImported === w);
      for (let w of E) {
        let N = L(w.sourceIdImported), O = L(w.targetIdImported);
        N && O && (It(
          N.id,
          O.id,
          w.label,
          w.color,
          w.deletable,
          w.labelEditable
        ), w.color && On(M, a.value, m, w.color));
      }
    }
    function se(y) {
      for (let E of y) {
        const L = g.value.links.filter((w) => w.id === E).map((w) => w.color).shift();
        L && (g.value.hasNonDefaultLinkColor(L, E) ? g.value.getLinkIdsWithNonDefaultLinkColors(
          L,
          E
        ).every(
          (O) => y.includes(O)
        ) && fr(M, a.value, L) : fr(M, a.value, L));
      }
    }
    function ge() {
      x.stop(), l.value.selectChildren().remove(), F = void 0, le = 0, de = 0, H = 1, M = void 0, I = void 0, D = void 0, q = void 0, x = void 0, te(), Yt();
    }
    function me() {
      m.isCanvasBoundToView && (f || ge());
    }
    function Le() {
      g.value.links.forEach(
        (y) => z("linkDeleted", { id: y.id, label: y.label })
      ), g.value.nodes.forEach(
        (y) => z("nodeDeleted", {
          id: y.id,
          label: y.label,
          x: y.x,
          y: y.y
        })
      ), g.value = new ci(), v.value = !1, ge();
    }
    return (y, E) => (kt(), St(dr, null, [
      E[0] || (E[0] = at("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      Rn(at("div", null, [
        bs(Ls, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": gr(c)
        }, null, 8, ["platform-type"])
      ], 512), [
        [Cn, !v.value]
      ])
    ], 64));
  }
});
export {
  gc as GraphComponent
};
