import { defineComponent as _i, createElementBlock as St, openBlock as kt, withDirectives as zn, createElementVNode as at, toDisplayString as Et, vShow as $n, Fragment as gr, renderList as jr, unref as pr, computed as Dr, onMounted as vs, onUnmounted as bs, ref as Gr, reactive as _s, createVNode as xs } from "vue";
const Es = { class: "graph-controller__controls-overview" }, Ss = { key: 0 }, ks = { key: 1 }, Ms = { key: 0 }, Ns = { key: 1 }, Ls = /* @__PURE__ */ _i({
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
    return (c, f) => (kt(), St("table", Es, [
      zn(at("thead", null, [
        at("tr", null, [
          at("th", null, Et(a[0]), 1),
          at("th", null, Et(a[1]), 1)
        ])
      ], 512), [
        [$n, t.showHeader]
      ]),
      at("tbody", null, [
        (kt(), St(gr, null, jr(n, (d) => zn(at("tr", {
          key: d.action
        }, [
          at("td", null, Et(d.action), 1),
          pr(h) ? (kt(), St("td", Ss, Et(d.touch), 1)) : (kt(), St("td", ks, Et(d.desktop), 1))
        ]), [
          [$n, t.showControlsGraph]
        ])), 64)),
        (kt(), St(gr, null, jr(l, (d) => zn(at("tr", {
          key: d.action
        }, [
          at("td", null, Et(d.action), 1),
          pr(h) ? (kt(), St("td", Ms, Et(d.touch), 1)) : (kt(), St("td", Ns, Et(d.desktop), 1))
        ]), [
          [$n, t.showControlsEnvironment]
        ])), 64))
      ])
    ]));
  }
}), Ts = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, a] of t)
    n[l] = a;
  return n;
}, Rs = /* @__PURE__ */ Ts(Ls, [["__scopeId", "data-v-8c3d818f"]]);
var Cs = { value: () => {
} };
function pn() {
  for (var e = 0, t = arguments.length, n = {}, l; e < t; ++e) {
    if (!(l = arguments[e] + "") || l in n || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    n[l] = [];
  }
  return new On(n);
}
function On(e) {
  this._ = e;
}
function Is(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var l = "", a = n.indexOf(".");
    if (a >= 0 && (l = n.slice(a + 1), n = n.slice(0, a)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: l };
  });
}
On.prototype = pn.prototype = {
  constructor: On,
  on: function(e, t) {
    var n = this._, l = Is(e + "", n), a, h = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++h < c; ) if ((a = (e = l[h]).type) && (a = Ps(n[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++h < c; )
      if (a = (e = l[h]).type) n[a] = Vr(n[a], e.name, t);
      else if (t == null) for (a in n) n[a] = Vr(n[a], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new On(e);
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
function Ps(e, t) {
  for (var n = 0, l = e.length, a; n < l; ++n)
    if ((a = e[n]).name === t)
      return a.value;
}
function Vr(e, t, n) {
  for (var l = 0, a = e.length; l < a; ++l)
    if (e[l].name === t) {
      e[l] = Cs, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var mr = "http://www.w3.org/1999/xhtml";
const qr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Kn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), qr.hasOwnProperty(t) ? { space: qr[t], local: e } : e;
}
function zs(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === mr && t.documentElement.namespaceURI === mr ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function $s(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function xi(e) {
  var t = Kn(e);
  return (t.local ? $s : zs)(t);
}
function Os() {
}
function Lr(e) {
  return e == null ? Os : function() {
    return this.querySelector(e);
  };
}
function As(e) {
  typeof e != "function" && (e = Lr(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = new Array(c), d, m, g = 0; g < c; ++g)
      (d = h[g]) && (m = e.call(d, d.__data__, g, h)) && ("__data__" in d && (m.__data__ = d.__data__), f[g] = m);
  return new rt(l, this._parents);
}
function Fs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Bs() {
  return [];
}
function Ei(e) {
  return e == null ? Bs : function() {
    return this.querySelectorAll(e);
  };
}
function js(e) {
  return function() {
    return Fs(e.apply(this, arguments));
  };
}
function Ds(e) {
  typeof e == "function" ? e = js(e) : e = Ei(e);
  for (var t = this._groups, n = t.length, l = [], a = [], h = 0; h < n; ++h)
    for (var c = t[h], f = c.length, d, m = 0; m < f; ++m)
      (d = c[m]) && (l.push(e.call(d, d.__data__, m, c)), a.push(d));
  return new rt(l, a);
}
function Si(e) {
  return function() {
    return this.matches(e);
  };
}
function ki(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Gs = Array.prototype.find;
function Vs(e) {
  return function() {
    return Gs.call(this.children, e);
  };
}
function qs() {
  return this.firstElementChild;
}
function Us(e) {
  return this.select(e == null ? qs : Vs(typeof e == "function" ? e : ki(e)));
}
var Ws = Array.prototype.filter;
function Xs() {
  return Array.from(this.children);
}
function Qs(e) {
  return function() {
    return Ws.call(this.children, e);
  };
}
function Ys(e) {
  return this.selectAll(e == null ? Xs : Qs(typeof e == "function" ? e : ki(e)));
}
function Js(e) {
  typeof e != "function" && (e = Si(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = [], d, m = 0; m < c; ++m)
      (d = h[m]) && e.call(d, d.__data__, m, h) && f.push(d);
  return new rt(l, this._parents);
}
function Mi(e) {
  return new Array(e.length);
}
function Zs() {
  return new rt(this._enter || this._groups.map(Mi), this._parents);
}
function Gn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Gn.prototype = {
  constructor: Gn,
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
function Ks(e) {
  return function() {
    return e;
  };
}
function Hs(e, t, n, l, a, h) {
  for (var c = 0, f, d = t.length, m = h.length; c < m; ++c)
    (f = t[c]) ? (f.__data__ = h[c], l[c] = f) : n[c] = new Gn(e, h[c]);
  for (; c < d; ++c)
    (f = t[c]) && (a[c] = f);
}
function eo(e, t, n, l, a, h, c) {
  var f, d, m = /* @__PURE__ */ new Map(), g = t.length, b = h.length, _ = new Array(g), R;
  for (f = 0; f < g; ++f)
    (d = t[f]) && (_[f] = R = c.call(d, d.__data__, f, t) + "", m.has(R) ? a[f] = d : m.set(R, d));
  for (f = 0; f < b; ++f)
    R = c.call(e, h[f], f, h) + "", (d = m.get(R)) ? (l[f] = d, d.__data__ = h[f], m.delete(R)) : n[f] = new Gn(e, h[f]);
  for (f = 0; f < g; ++f)
    (d = t[f]) && m.get(_[f]) === d && (a[f] = d);
}
function to(e) {
  return e.__data__;
}
function no(e, t) {
  if (!arguments.length) return Array.from(this, to);
  var n = t ? eo : Hs, l = this._parents, a = this._groups;
  typeof e != "function" && (e = Ks(e));
  for (var h = a.length, c = new Array(h), f = new Array(h), d = new Array(h), m = 0; m < h; ++m) {
    var g = l[m], b = a[m], _ = b.length, R = ro(e.call(g, g && g.__data__, m, l)), z = R.length, F = f[m] = new Array(z), $ = c[m] = new Array(z), k = d[m] = new Array(_);
    n(g, b, F, $, k, R, t);
    for (var B = 0, Z = 0, P, D; B < z; ++B)
      if (P = F[B]) {
        for (B >= Z && (Z = B + 1); !(D = $[Z]) && ++Z < z; ) ;
        P._next = D || null;
      }
  }
  return c = new rt(c, l), c._enter = f, c._exit = d, c;
}
function ro(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function io() {
  return new rt(this._exit || this._groups.map(Mi), this._parents);
}
function so(e, t, n) {
  var l = this.enter(), a = this, h = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), t != null && (a = t(a), a && (a = a.selection())), n == null ? h.remove() : n(h), l && a ? l.merge(a).order() : a;
}
function oo(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, l = t._groups, a = n.length, h = l.length, c = Math.min(a, h), f = new Array(a), d = 0; d < c; ++d)
    for (var m = n[d], g = l[d], b = m.length, _ = f[d] = new Array(b), R, z = 0; z < b; ++z)
      (R = m[z] || g[z]) && (_[z] = R);
  for (; d < a; ++d)
    f[d] = n[d];
  return new rt(f, this._parents);
}
function lo() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var l = e[t], a = l.length - 1, h = l[a], c; --a >= 0; )
      (c = l[a]) && (h && c.compareDocumentPosition(h) ^ 4 && h.parentNode.insertBefore(c, h), h = c);
  return this;
}
function ao(e) {
  e || (e = uo);
  function t(b, _) {
    return b && _ ? e(b.__data__, _.__data__) : !b - !_;
  }
  for (var n = this._groups, l = n.length, a = new Array(l), h = 0; h < l; ++h) {
    for (var c = n[h], f = c.length, d = a[h] = new Array(f), m, g = 0; g < f; ++g)
      (m = c[g]) && (d[g] = m);
    d.sort(t);
  }
  return new rt(a, this._parents).order();
}
function uo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ho() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function co() {
  return Array.from(this);
}
function fo() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var l = e[t], a = 0, h = l.length; a < h; ++a) {
      var c = l[a];
      if (c) return c;
    }
  return null;
}
function go() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function po() {
  return !this.node();
}
function mo(e) {
  for (var t = this._groups, n = 0, l = t.length; n < l; ++n)
    for (var a = t[n], h = 0, c = a.length, f; h < c; ++h)
      (f = a[h]) && e.call(f, f.__data__, h, a);
  return this;
}
function wo(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function yo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function vo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function bo(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function _o(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function xo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Eo(e, t) {
  var n = Kn(e);
  if (arguments.length < 2) {
    var l = this.node();
    return n.local ? l.getAttributeNS(n.space, n.local) : l.getAttribute(n);
  }
  return this.each((t == null ? n.local ? yo : wo : typeof t == "function" ? n.local ? xo : _o : n.local ? bo : vo)(n, t));
}
function Ni(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function So(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ko(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Mo(e, t, n) {
  return function() {
    var l = t.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, n);
  };
}
function No(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? So : typeof t == "function" ? Mo : ko)(e, t, n ?? "")) : Qt(this.node(), e);
}
function Qt(e, t) {
  return e.style.getPropertyValue(t) || Ni(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Lo(e) {
  return function() {
    delete this[e];
  };
}
function To(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ro(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Co(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Lo : typeof t == "function" ? Ro : To)(e, t)) : this.node()[e];
}
function Li(e) {
  return e.trim().split(/^|\s+/);
}
function Tr(e) {
  return e.classList || new Ti(e);
}
function Ti(e) {
  this._node = e, this._names = Li(e.getAttribute("class") || "");
}
Ti.prototype = {
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
function Ri(e, t) {
  for (var n = Tr(e), l = -1, a = t.length; ++l < a; ) n.add(t[l]);
}
function Ci(e, t) {
  for (var n = Tr(e), l = -1, a = t.length; ++l < a; ) n.remove(t[l]);
}
function Io(e) {
  return function() {
    Ri(this, e);
  };
}
function Po(e) {
  return function() {
    Ci(this, e);
  };
}
function zo(e, t) {
  return function() {
    (t.apply(this, arguments) ? Ri : Ci)(this, e);
  };
}
function $o(e, t) {
  var n = Li(e + "");
  if (arguments.length < 2) {
    for (var l = Tr(this.node()), a = -1, h = n.length; ++a < h; ) if (!l.contains(n[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? zo : t ? Io : Po)(n, t));
}
function Oo() {
  this.textContent = "";
}
function Ao(e) {
  return function() {
    this.textContent = e;
  };
}
function Fo(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Bo(e) {
  return arguments.length ? this.each(e == null ? Oo : (typeof e == "function" ? Fo : Ao)(e)) : this.node().textContent;
}
function jo() {
  this.innerHTML = "";
}
function Do(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Go(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Vo(e) {
  return arguments.length ? this.each(e == null ? jo : (typeof e == "function" ? Go : Do)(e)) : this.node().innerHTML;
}
function qo() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Uo() {
  return this.each(qo);
}
function Wo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Xo() {
  return this.each(Wo);
}
function Qo(e) {
  var t = typeof e == "function" ? e : xi(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Yo() {
  return null;
}
function Jo(e, t) {
  var n = typeof e == "function" ? e : xi(e), l = t == null ? Yo : typeof t == "function" ? t : Lr(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function Zo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ko() {
  return this.each(Zo);
}
function Ho() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function el() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function tl(e) {
  return this.select(e ? el : Ho);
}
function nl(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function rl(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function il(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", l = t.indexOf(".");
    return l >= 0 && (n = t.slice(l + 1), t = t.slice(0, l)), { type: t, name: n };
  });
}
function sl(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, l = -1, a = t.length, h; n < a; ++n)
        h = t[n], (!e.type || h.type === e.type) && h.name === e.name ? this.removeEventListener(h.type, h.listener, h.options) : t[++l] = h;
      ++l ? t.length = l : delete this.__on;
    }
  };
}
function ol(e, t, n) {
  return function() {
    var l = this.__on, a, h = rl(t);
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
function ll(e, t, n) {
  var l = il(e + ""), a, h = l.length, c;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var d = 0, m = f.length, g; d < m; ++d)
        for (a = 0, g = f[d]; a < h; ++a)
          if ((c = l[a]).type === g.type && c.name === g.name)
            return g.value;
    }
    return;
  }
  for (f = t ? ol : sl, a = 0; a < h; ++a) this.each(f(l[a], t, n));
  return this;
}
function Ii(e, t, n) {
  var l = Ni(e), a = l.CustomEvent;
  typeof a == "function" ? a = new a(t, n) : (a = l.document.createEvent("Event"), n ? (a.initEvent(t, n.bubbles, n.cancelable), a.detail = n.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
}
function al(e, t) {
  return function() {
    return Ii(this, e, t);
  };
}
function ul(e, t) {
  return function() {
    return Ii(this, e, t.apply(this, arguments));
  };
}
function hl(e, t) {
  return this.each((typeof t == "function" ? ul : al)(e, t));
}
function* cl() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var l = e[t], a = 0, h = l.length, c; a < h; ++a)
      (c = l[a]) && (yield c);
}
var Pi = [null];
function rt(e, t) {
  this._groups = e, this._parents = t;
}
function mn() {
  return new rt([[document.documentElement]], Pi);
}
function fl() {
  return this;
}
rt.prototype = mn.prototype = {
  constructor: rt,
  select: As,
  selectAll: Ds,
  selectChild: Us,
  selectChildren: Ys,
  filter: Js,
  data: no,
  enter: Zs,
  exit: io,
  join: so,
  merge: oo,
  selection: fl,
  order: lo,
  sort: ao,
  call: ho,
  nodes: co,
  node: fo,
  size: go,
  empty: po,
  each: mo,
  attr: Eo,
  style: No,
  property: Co,
  classed: $o,
  text: Bo,
  html: Vo,
  raise: Uo,
  lower: Xo,
  append: Qo,
  insert: Jo,
  remove: Ko,
  clone: tl,
  datum: nl,
  on: ll,
  dispatch: hl,
  [Symbol.iterator]: cl
};
function be(e) {
  return typeof e == "string" ? new rt([[document.querySelector(e)]], [document.documentElement]) : new rt([[e]], Pi);
}
function zi(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function it(e, t) {
  if (e = zi(e), t === void 0 && (t = e.currentTarget), t) {
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
function dl(e, t) {
  return e.target && (e = zi(e), t === void 0 && (t = e.currentTarget), e = e.touches || [e]), Array.from(e, (n) => it(n, t));
}
const gl = { passive: !1 }, an = { capture: !0, passive: !1 };
function ar(e) {
  e.stopImmediatePropagation();
}
function Wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function $i(e) {
  var t = e.document.documentElement, n = be(e).on("dragstart.drag", Wt, an);
  "onselectstart" in t ? n.on("selectstart.drag", Wt, an) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Oi(e, t) {
  var n = e.document.documentElement, l = be(e).on("dragstart.drag", null);
  t && (l.on("click.drag", Wt, an), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in n ? l.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Mn = (e) => () => e;
function wr(e, {
  sourceEvent: t,
  subject: n,
  target: l,
  identifier: a,
  active: h,
  x: c,
  y: f,
  dx: d,
  dy: m,
  dispatch: g
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
    dx: { value: d, enumerable: !0, configurable: !0 },
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
wr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function pl(e) {
  return !e.ctrlKey && !e.button;
}
function ml() {
  return this.parentNode;
}
function wl(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function yl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function vl() {
  var e = pl, t = ml, n = wl, l = yl, a = {}, h = pn("start", "drag", "end"), c = 0, f, d, m, g, b = 0;
  function _(P) {
    P.on("mousedown.drag", R).filter(l).on("touchstart.drag", $).on("touchmove.drag", k, gl).on("touchend.drag touchcancel.drag", B).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function R(P, D) {
    if (!(g || !e.call(this, P, D))) {
      var te = Z(this, t.call(this, P, D), P, D, "mouse");
      te && (be(P.view).on("mousemove.drag", z, an).on("mouseup.drag", F, an), $i(P.view), ar(P), m = !1, f = P.clientX, d = P.clientY, te("start", P));
    }
  }
  function z(P) {
    if (Wt(P), !m) {
      var D = P.clientX - f, te = P.clientY - d;
      m = D * D + te * te > b;
    }
    a.mouse("drag", P);
  }
  function F(P) {
    be(P.view).on("mousemove.drag mouseup.drag", null), Oi(P.view, m), Wt(P), a.mouse("end", P);
  }
  function $(P, D) {
    if (e.call(this, P, D)) {
      var te = P.changedTouches, ne = t.call(this, P, D), he = te.length, ge, re;
      for (ge = 0; ge < he; ++ge)
        (re = Z(this, ne, P, D, te[ge].identifier, te[ge])) && (ar(P), re("start", P, te[ge]));
    }
  }
  function k(P) {
    var D = P.changedTouches, te = D.length, ne, he;
    for (ne = 0; ne < te; ++ne)
      (he = a[D[ne].identifier]) && (Wt(P), he("drag", P, D[ne]));
  }
  function B(P) {
    var D = P.changedTouches, te = D.length, ne, he;
    for (g && clearTimeout(g), g = setTimeout(function() {
      g = null;
    }, 500), ne = 0; ne < te; ++ne)
      (he = a[D[ne].identifier]) && (ar(P), he("end", P, D[ne]));
  }
  function Z(P, D, te, ne, he, ge) {
    var re = h.copy(), de = it(ge || te, D), ye, ae, A;
    if ((A = n.call(P, new wr("beforestart", {
      sourceEvent: te,
      target: _,
      identifier: he,
      active: c,
      x: de[0],
      y: de[1],
      dx: 0,
      dy: 0,
      dispatch: re
    }), ne)) != null)
      return ye = A.x - de[0] || 0, ae = A.y - de[1] || 0, function ee(W, oe, ue) {
        var fe = de, pe;
        switch (W) {
          case "start":
            a[he] = ee, pe = c++;
            break;
          case "end":
            delete a[he], --c;
          // falls through
          case "drag":
            de = it(ue || oe, D), pe = c;
            break;
        }
        re.call(
          W,
          P,
          new wr(W, {
            sourceEvent: oe,
            subject: A,
            target: _,
            identifier: he,
            active: pe,
            x: de[0] + ye,
            y: de[1] + ae,
            dx: de[0] - fe[0],
            dy: de[1] - fe[1],
            dispatch: re
          }),
          ne
        );
      };
  }
  return _.filter = function(P) {
    return arguments.length ? (e = typeof P == "function" ? P : Mn(!!P), _) : e;
  }, _.container = function(P) {
    return arguments.length ? (t = typeof P == "function" ? P : Mn(P), _) : t;
  }, _.subject = function(P) {
    return arguments.length ? (n = typeof P == "function" ? P : Mn(P), _) : n;
  }, _.touchable = function(P) {
    return arguments.length ? (l = typeof P == "function" ? P : Mn(!!P), _) : l;
  }, _.on = function() {
    var P = h.on.apply(h, arguments);
    return P === h ? _ : P;
  }, _.clickDistance = function(P) {
    return arguments.length ? (b = (P = +P) * P, _) : Math.sqrt(b);
  }, _;
}
function Rr(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Ai(e, t) {
  var n = Object.create(e.prototype);
  for (var l in t) n[l] = t[l];
  return n;
}
function wn() {
}
var un = 0.7, Vn = 1 / un, Xt = "\\s*([+-]?\\d+)\\s*", hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", bl = /^#([0-9a-f]{3,8})$/, _l = new RegExp(`^rgb\\(${Xt},${Xt},${Xt}\\)$`), xl = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), El = new RegExp(`^rgba\\(${Xt},${Xt},${Xt},${hn}\\)$`), Sl = new RegExp(`^rgba\\(${mt},${mt},${mt},${hn}\\)$`), kl = new RegExp(`^hsl\\(${hn},${mt},${mt}\\)$`), Ml = new RegExp(`^hsla\\(${hn},${mt},${mt},${hn}\\)$`), Ur = {
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
Rr(wn, Bt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Wr,
  // Deprecated! Use color.formatHex.
  formatHex: Wr,
  formatHex8: Nl,
  formatHsl: Ll,
  formatRgb: Xr,
  toString: Xr
});
function Wr() {
  return this.rgb().formatHex();
}
function Nl() {
  return this.rgb().formatHex8();
}
function Ll() {
  return Fi(this).formatHsl();
}
function Xr() {
  return this.rgb().formatRgb();
}
function Bt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = bl.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Qr(t) : n === 3 ? new Ze(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Nn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Nn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = _l.exec(e)) ? new Ze(t[1], t[2], t[3], 1) : (t = xl.exec(e)) ? new Ze(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = El.exec(e)) ? Nn(t[1], t[2], t[3], t[4]) : (t = Sl.exec(e)) ? Nn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = kl.exec(e)) ? Zr(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ml.exec(e)) ? Zr(t[1], t[2] / 100, t[3] / 100, t[4]) : Ur.hasOwnProperty(e) ? Qr(Ur[e]) : e === "transparent" ? new Ze(NaN, NaN, NaN, 0) : null;
}
function Qr(e) {
  return new Ze(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Nn(e, t, n, l) {
  return l <= 0 && (e = t = n = NaN), new Ze(e, t, n, l);
}
function Tl(e) {
  return e instanceof wn || (e = Bt(e)), e ? (e = e.rgb(), new Ze(e.r, e.g, e.b, e.opacity)) : new Ze();
}
function yr(e, t, n, l) {
  return arguments.length === 1 ? Tl(e) : new Ze(e, t, n, l ?? 1);
}
function Ze(e, t, n, l) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +l;
}
Rr(Ze, yr, Ai(wn, {
  brighter(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new Ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? un : Math.pow(un, e), new Ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ze(Ft(this.r), Ft(this.g), Ft(this.b), qn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Yr,
  // Deprecated! Use color.formatHex.
  formatHex: Yr,
  formatHex8: Rl,
  formatRgb: Jr,
  toString: Jr
}));
function Yr() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}`;
}
function Rl() {
  return `#${At(this.r)}${At(this.g)}${At(this.b)}${At((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Jr() {
  const e = qn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ft(this.r)}, ${Ft(this.g)}, ${Ft(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function qn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ft(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function At(e) {
  return e = Ft(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Zr(e, t, n, l) {
  return l <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ut(e, t, n, l);
}
function Fi(e) {
  if (e instanceof ut) return new ut(e.h, e.s, e.l, e.opacity);
  if (e instanceof wn || (e = Bt(e)), !e) return new ut();
  if (e instanceof ut) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, l = e.b / 255, a = Math.min(t, n, l), h = Math.max(t, n, l), c = NaN, f = h - a, d = (h + a) / 2;
  return f ? (t === h ? c = (n - l) / f + (n < l) * 6 : n === h ? c = (l - t) / f + 2 : c = (t - n) / f + 4, f /= d < 0.5 ? h + a : 2 - h - a, c *= 60) : f = d > 0 && d < 1 ? 0 : c, new ut(c, f, d, e.opacity);
}
function Cl(e, t, n, l) {
  return arguments.length === 1 ? Fi(e) : new ut(e, t, n, l ?? 1);
}
function ut(e, t, n, l) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +l;
}
Rr(ut, Cl, Ai(wn, {
  brighter(e) {
    return e = e == null ? Vn : Math.pow(Vn, e), new ut(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? un : Math.pow(un, e), new ut(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, l = n + (n < 0.5 ? n : 1 - n) * t, a = 2 * n - l;
    return new Ze(
      ur(e >= 240 ? e - 240 : e + 120, a, l),
      ur(e, a, l),
      ur(e < 120 ? e + 240 : e - 120, a, l),
      this.opacity
    );
  },
  clamp() {
    return new ut(Kr(this.h), Ln(this.s), Ln(this.l), qn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = qn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Kr(this.h)}, ${Ln(this.s) * 100}%, ${Ln(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Kr(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ln(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ur(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Cr = (e) => () => e;
function Il(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Pl(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(l) {
    return Math.pow(e + l * t, n);
  };
}
function zl(e) {
  return (e = +e) == 1 ? Bi : function(t, n) {
    return n - t ? Pl(t, n, e) : Cr(isNaN(t) ? n : t);
  };
}
function Bi(e, t) {
  var n = t - e;
  return n ? Il(e, n) : Cr(isNaN(e) ? t : e);
}
const Un = (function e(t) {
  var n = zl(t);
  function l(a, h) {
    var c = n((a = yr(a)).r, (h = yr(h)).r), f = n(a.g, h.g), d = n(a.b, h.b), m = Bi(a.opacity, h.opacity);
    return function(g) {
      return a.r = c(g), a.g = f(g), a.b = d(g), a.opacity = m(g), a + "";
    };
  }
  return l.gamma = e, l;
})(1);
function $l(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, l = t.slice(), a;
  return function(h) {
    for (a = 0; a < n; ++a) l[a] = e[a] * (1 - h) + t[a] * h;
    return l;
  };
}
function Ol(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Al(e, t) {
  var n = t ? t.length : 0, l = e ? Math.min(n, e.length) : 0, a = new Array(l), h = new Array(n), c;
  for (c = 0; c < l; ++c) a[c] = Ir(e[c], t[c]);
  for (; c < n; ++c) h[c] = t[c];
  return function(f) {
    for (c = 0; c < l; ++c) h[c] = a[c](f);
    return h;
  };
}
function Fl(e, t) {
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
function Bl(e, t) {
  var n = {}, l = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? n[a] = Ir(e[a], t[a]) : l[a] = t[a];
  return function(h) {
    for (a in n) l[a] = n[a](h);
    return l;
  };
}
var vr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hr = new RegExp(vr.source, "g");
function jl(e) {
  return function() {
    return e;
  };
}
function Dl(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ji(e, t) {
  var n = vr.lastIndex = hr.lastIndex = 0, l, a, h, c = -1, f = [], d = [];
  for (e = e + "", t = t + ""; (l = vr.exec(e)) && (a = hr.exec(t)); )
    (h = a.index) > n && (h = t.slice(n, h), f[c] ? f[c] += h : f[++c] = h), (l = l[0]) === (a = a[0]) ? f[c] ? f[c] += a : f[++c] = a : (f[++c] = null, d.push({ i: c, x: pt(l, a) })), n = hr.lastIndex;
  return n < t.length && (h = t.slice(n), f[c] ? f[c] += h : f[++c] = h), f.length < 2 ? d[0] ? Dl(d[0].x) : jl(t) : (t = d.length, function(m) {
    for (var g = 0, b; g < t; ++g) f[(b = d[g]).i] = b.x(m);
    return f.join("");
  });
}
function Ir(e, t) {
  var n = typeof t, l;
  return t == null || n === "boolean" ? Cr(t) : (n === "number" ? pt : n === "string" ? (l = Bt(t)) ? (t = l, Un) : ji : t instanceof Bt ? Un : t instanceof Date ? Fl : Ol(t) ? $l : Array.isArray(t) ? Al : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Bl : pt)(e, t);
}
var Hr = 180 / Math.PI, br = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Di(e, t, n, l, a, h) {
  var c, f, d;
  return (c = Math.sqrt(e * e + t * t)) && (e /= c, t /= c), (d = e * n + t * l) && (n -= e * d, l -= t * d), (f = Math.sqrt(n * n + l * l)) && (n /= f, l /= f, d /= f), e * l < t * n && (e = -e, t = -t, d = -d, c = -c), {
    translateX: a,
    translateY: h,
    rotate: Math.atan2(t, e) * Hr,
    skewX: Math.atan(d) * Hr,
    scaleX: c,
    scaleY: f
  };
}
var Tn;
function Gl(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? br : Di(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Vl(e) {
  return e == null || (Tn || (Tn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Tn.setAttribute("transform", e), !(e = Tn.transform.baseVal.consolidate())) ? br : (e = e.matrix, Di(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Gi(e, t, n, l) {
  function a(m) {
    return m.length ? m.pop() + " " : "";
  }
  function h(m, g, b, _, R, z) {
    if (m !== b || g !== _) {
      var F = R.push("translate(", null, t, null, n);
      z.push({ i: F - 4, x: pt(m, b) }, { i: F - 2, x: pt(g, _) });
    } else (b || _) && R.push("translate(" + b + t + _ + n);
  }
  function c(m, g, b, _) {
    m !== g ? (m - g > 180 ? g += 360 : g - m > 180 && (m += 360), _.push({ i: b.push(a(b) + "rotate(", null, l) - 2, x: pt(m, g) })) : g && b.push(a(b) + "rotate(" + g + l);
  }
  function f(m, g, b, _) {
    m !== g ? _.push({ i: b.push(a(b) + "skewX(", null, l) - 2, x: pt(m, g) }) : g && b.push(a(b) + "skewX(" + g + l);
  }
  function d(m, g, b, _, R, z) {
    if (m !== b || g !== _) {
      var F = R.push(a(R) + "scale(", null, ",", null, ")");
      z.push({ i: F - 4, x: pt(m, b) }, { i: F - 2, x: pt(g, _) });
    } else (b !== 1 || _ !== 1) && R.push(a(R) + "scale(" + b + "," + _ + ")");
  }
  return function(m, g) {
    var b = [], _ = [];
    return m = e(m), g = e(g), h(m.translateX, m.translateY, g.translateX, g.translateY, b, _), c(m.rotate, g.rotate, b, _), f(m.skewX, g.skewX, b, _), d(m.scaleX, m.scaleY, g.scaleX, g.scaleY, b, _), m = g = null, function(R) {
      for (var z = -1, F = _.length, $; ++z < F; ) b[($ = _[z]).i] = $.x(R);
      return b.join("");
    };
  };
}
var ql = Gi(Gl, "px, ", "px)", "deg)"), Ul = Gi(Vl, ", ", ")", ")"), Wl = 1e-12;
function ei(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Xl(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ql(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Yl = (function e(t, n, l) {
  function a(h, c) {
    var f = h[0], d = h[1], m = h[2], g = c[0], b = c[1], _ = c[2], R = g - f, z = b - d, F = R * R + z * z, $, k;
    if (F < Wl)
      k = Math.log(_ / m) / t, $ = function(ne) {
        return [
          f + ne * R,
          d + ne * z,
          m * Math.exp(t * ne * k)
        ];
      };
    else {
      var B = Math.sqrt(F), Z = (_ * _ - m * m + l * F) / (2 * m * n * B), P = (_ * _ - m * m - l * F) / (2 * _ * n * B), D = Math.log(Math.sqrt(Z * Z + 1) - Z), te = Math.log(Math.sqrt(P * P + 1) - P);
      k = (te - D) / t, $ = function(ne) {
        var he = ne * k, ge = ei(D), re = m / (n * B) * (ge * Ql(t * he + D) - Xl(D));
        return [
          f + re * R,
          d + re * z,
          m * ge / ei(t * he + D)
        ];
      };
    }
    return $.duration = k * 1e3 * t / Math.SQRT2, $;
  }
  return a.rho = function(h) {
    var c = Math.max(1e-3, +h), f = c * c, d = f * f;
    return e(c, f, d);
  }, a;
})(Math.SQRT2, 2, 4);
var Yt = 0, nn = 0, en = 0, Vi = 1e3, Wn, rn, Xn = 0, jt = 0, Hn = 0, cn = typeof performance == "object" && performance.now ? performance : Date, qi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Pr() {
  return jt || (qi(Jl), jt = cn.now() + Hn);
}
function Jl() {
  jt = 0;
}
function Qn() {
  this._call = this._time = this._next = null;
}
Qn.prototype = zr.prototype = {
  constructor: Qn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Pr() : +n) + (t == null ? 0 : +t), !this._next && rn !== this && (rn ? rn._next = this : Wn = this, rn = this), this._call = e, this._time = n, _r();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, _r());
  }
};
function zr(e, t, n) {
  var l = new Qn();
  return l.restart(e, t, n), l;
}
function Zl() {
  Pr(), ++Yt;
  for (var e = Wn, t; e; )
    (t = jt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Yt;
}
function ti() {
  jt = (Xn = cn.now()) + Hn, Yt = nn = 0;
  try {
    Zl();
  } finally {
    Yt = 0, Hl(), jt = 0;
  }
}
function Kl() {
  var e = cn.now(), t = e - Xn;
  t > Vi && (Hn -= t, Xn = e);
}
function Hl() {
  for (var e, t = Wn, n, l = 1 / 0; t; )
    t._call ? (l > t._time && (l = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Wn = n);
  rn = e, _r(l);
}
function _r(e) {
  if (!Yt) {
    nn && (nn = clearTimeout(nn));
    var t = e - jt;
    t > 24 ? (e < 1 / 0 && (nn = setTimeout(ti, e - cn.now() - Hn)), en && (en = clearInterval(en))) : (en || (Xn = cn.now(), en = setInterval(Kl, Vi)), Yt = 1, qi(ti));
  }
}
function ni(e, t, n) {
  var l = new Qn();
  return t = t == null ? 0 : +t, l.restart((a) => {
    l.stop(), e(a + t);
  }, t, n), l;
}
var ea = pn("start", "end", "cancel", "interrupt"), ta = [], Ui = 0, ri = 1, xr = 2, An = 3, ii = 4, Er = 5, Fn = 6;
function er(e, t, n, l, a, h) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (n in c) return;
  na(e, n, {
    name: t,
    index: l,
    // For context during callback.
    group: a,
    // For context during callback.
    on: ea,
    tween: ta,
    time: h.time,
    delay: h.delay,
    duration: h.duration,
    ease: h.ease,
    timer: null,
    state: Ui
  });
}
function $r(e, t) {
  var n = ht(e, t);
  if (n.state > Ui) throw new Error("too late; already scheduled");
  return n;
}
function wt(e, t) {
  var n = ht(e, t);
  if (n.state > An) throw new Error("too late; already running");
  return n;
}
function ht(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function na(e, t, n) {
  var l = e.__transition, a;
  l[t] = n, n.timer = zr(h, 0, n.time);
  function h(m) {
    n.state = ri, n.timer.restart(c, n.delay, n.time), n.delay <= m && c(m - n.delay);
  }
  function c(m) {
    var g, b, _, R;
    if (n.state !== ri) return d();
    for (g in l)
      if (R = l[g], R.name === n.name) {
        if (R.state === An) return ni(c);
        R.state === ii ? (R.state = Fn, R.timer.stop(), R.on.call("interrupt", e, e.__data__, R.index, R.group), delete l[g]) : +g < t && (R.state = Fn, R.timer.stop(), R.on.call("cancel", e, e.__data__, R.index, R.group), delete l[g]);
      }
    if (ni(function() {
      n.state === An && (n.state = ii, n.timer.restart(f, n.delay, n.time), f(m));
    }), n.state = xr, n.on.call("start", e, e.__data__, n.index, n.group), n.state === xr) {
      for (n.state = An, a = new Array(_ = n.tween.length), g = 0, b = -1; g < _; ++g)
        (R = n.tween[g].value.call(e, e.__data__, n.index, n.group)) && (a[++b] = R);
      a.length = b + 1;
    }
  }
  function f(m) {
    for (var g = m < n.duration ? n.ease.call(null, m / n.duration) : (n.timer.restart(d), n.state = Er, 1), b = -1, _ = a.length; ++b < _; )
      a[b].call(e, g);
    n.state === Er && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = Fn, n.timer.stop(), delete l[t];
    for (var m in l) return;
    delete e.__transition;
  }
}
function Bn(e, t) {
  var n = e.__transition, l, a, h = !0, c;
  if (n) {
    t = t == null ? null : t + "";
    for (c in n) {
      if ((l = n[c]).name !== t) {
        h = !1;
        continue;
      }
      a = l.state > xr && l.state < Er, l.state = Fn, l.timer.stop(), l.on.call(a ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete n[c];
    }
    h && delete e.__transition;
  }
}
function ra(e) {
  return this.each(function() {
    Bn(this, e);
  });
}
function ia(e, t) {
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
function sa(e, t, n) {
  var l, a;
  if (typeof n != "function") throw new Error();
  return function() {
    var h = wt(this, e), c = h.tween;
    if (c !== l) {
      a = (l = c).slice();
      for (var f = { name: t, value: n }, d = 0, m = a.length; d < m; ++d)
        if (a[d].name === t) {
          a[d] = f;
          break;
        }
      d === m && a.push(f);
    }
    h.tween = a;
  };
}
function oa(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = ht(this.node(), n).tween, a = 0, h = l.length, c; a < h; ++a)
      if ((c = l[a]).name === e)
        return c.value;
    return null;
  }
  return this.each((t == null ? ia : sa)(n, e, t));
}
function Or(e, t, n) {
  var l = e._id;
  return e.each(function() {
    var a = wt(this, l);
    (a.value || (a.value = {}))[t] = n.apply(this, arguments);
  }), function(a) {
    return ht(a, l).value[t];
  };
}
function Wi(e, t) {
  var n;
  return (typeof t == "number" ? pt : t instanceof Bt ? Un : (n = Bt(t)) ? (t = n, Un) : ji)(e, t);
}
function la(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function aa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ua(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = this.getAttribute(e);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function ha(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function ca(e, t, n) {
  var l, a, h;
  return function() {
    var c, f = n(this), d;
    return f == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), d = f + "", c === d ? null : c === l && d === a ? h : (a = d, h = t(l = c, f)));
  };
}
function fa(e, t, n) {
  var l, a, h;
  return function() {
    var c, f = n(this), d;
    return f == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), d = f + "", c === d ? null : c === l && d === a ? h : (a = d, h = t(l = c, f)));
  };
}
function da(e, t) {
  var n = Kn(e), l = n === "transform" ? Ul : Wi;
  return this.attrTween(e, typeof t == "function" ? (n.local ? fa : ca)(n, l, Or(this, "attr." + e, t)) : t == null ? (n.local ? aa : la)(n) : (n.local ? ha : ua)(n, l, t));
}
function ga(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function pa(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ma(e, t) {
  var n, l;
  function a() {
    var h = t.apply(this, arguments);
    return h !== l && (n = (l = h) && pa(e, h)), n;
  }
  return a._value = t, a;
}
function wa(e, t) {
  var n, l;
  function a() {
    var h = t.apply(this, arguments);
    return h !== l && (n = (l = h) && ga(e, h)), n;
  }
  return a._value = t, a;
}
function ya(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var l = Kn(e);
  return this.tween(n, (l.local ? ma : wa)(l, t));
}
function va(e, t) {
  return function() {
    $r(this, e).delay = +t.apply(this, arguments);
  };
}
function ba(e, t) {
  return t = +t, function() {
    $r(this, e).delay = t;
  };
}
function _a(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? va : ba)(t, e)) : ht(this.node(), t).delay;
}
function xa(e, t) {
  return function() {
    wt(this, e).duration = +t.apply(this, arguments);
  };
}
function Ea(e, t) {
  return t = +t, function() {
    wt(this, e).duration = t;
  };
}
function Sa(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? xa : Ea)(t, e)) : ht(this.node(), t).duration;
}
function ka(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    wt(this, e).ease = t;
  };
}
function Ma(e) {
  var t = this._id;
  return arguments.length ? this.each(ka(t, e)) : ht(this.node(), t).ease;
}
function Na(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    wt(this, e).ease = n;
  };
}
function La(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Na(this._id, e));
}
function Ta(e) {
  typeof e != "function" && (e = Si(e));
  for (var t = this._groups, n = t.length, l = new Array(n), a = 0; a < n; ++a)
    for (var h = t[a], c = h.length, f = l[a] = [], d, m = 0; m < c; ++m)
      (d = h[m]) && e.call(d, d.__data__, m, h) && f.push(d);
  return new _t(l, this._parents, this._name, this._id);
}
function Ra(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, l = t.length, a = n.length, h = Math.min(l, a), c = new Array(l), f = 0; f < h; ++f)
    for (var d = t[f], m = n[f], g = d.length, b = c[f] = new Array(g), _, R = 0; R < g; ++R)
      (_ = d[R] || m[R]) && (b[R] = _);
  for (; f < l; ++f)
    c[f] = t[f];
  return new _t(c, this._parents, this._name, this._id);
}
function Ca(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Ia(e, t, n) {
  var l, a, h = Ca(t) ? $r : wt;
  return function() {
    var c = h(this, e), f = c.on;
    f !== l && (a = (l = f).copy()).on(t, n), c.on = a;
  };
}
function Pa(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ht(this.node(), n).on.on(e) : this.each(Ia(n, e, t));
}
function za(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function $a() {
  return this.on("end.remove", za(this._id));
}
function Oa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Lr(e));
  for (var l = this._groups, a = l.length, h = new Array(a), c = 0; c < a; ++c)
    for (var f = l[c], d = f.length, m = h[c] = new Array(d), g, b, _ = 0; _ < d; ++_)
      (g = f[_]) && (b = e.call(g, g.__data__, _, f)) && ("__data__" in g && (b.__data__ = g.__data__), m[_] = b, er(m[_], t, n, _, m, ht(g, n)));
  return new _t(h, this._parents, t, n);
}
function Aa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ei(e));
  for (var l = this._groups, a = l.length, h = [], c = [], f = 0; f < a; ++f)
    for (var d = l[f], m = d.length, g, b = 0; b < m; ++b)
      if (g = d[b]) {
        for (var _ = e.call(g, g.__data__, b, d), R, z = ht(g, n), F = 0, $ = _.length; F < $; ++F)
          (R = _[F]) && er(R, t, n, F, _, z);
        h.push(_), c.push(g);
      }
  return new _t(h, c, t, n);
}
var Fa = mn.prototype.constructor;
function Ba() {
  return new Fa(this._groups, this._parents);
}
function ja(e, t) {
  var n, l, a;
  return function() {
    var h = Qt(this, e), c = (this.style.removeProperty(e), Qt(this, e));
    return h === c ? null : h === n && c === l ? a : a = t(n = h, l = c);
  };
}
function Xi(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Da(e, t, n) {
  var l, a = n + "", h;
  return function() {
    var c = Qt(this, e);
    return c === a ? null : c === l ? h : h = t(l = c, n);
  };
}
function Ga(e, t, n) {
  var l, a, h;
  return function() {
    var c = Qt(this, e), f = n(this), d = f + "";
    return f == null && (d = f = (this.style.removeProperty(e), Qt(this, e))), c === d ? null : c === l && d === a ? h : (a = d, h = t(l = c, f));
  };
}
function Va(e, t) {
  var n, l, a, h = "style." + t, c = "end." + h, f;
  return function() {
    var d = wt(this, e), m = d.on, g = d.value[h] == null ? f || (f = Xi(t)) : void 0;
    (m !== n || a !== g) && (l = (n = m).copy()).on(c, a = g), d.on = l;
  };
}
function qa(e, t, n) {
  var l = (e += "") == "transform" ? ql : Wi;
  return t == null ? this.styleTween(e, ja(e, l)).on("end.style." + e, Xi(e)) : typeof t == "function" ? this.styleTween(e, Ga(e, l, Or(this, "style." + e, t))).each(Va(this._id, e)) : this.styleTween(e, Da(e, l, t), n).on("end.style." + e, null);
}
function Ua(e, t, n) {
  return function(l) {
    this.style.setProperty(e, t.call(this, l), n);
  };
}
function Wa(e, t, n) {
  var l, a;
  function h() {
    var c = t.apply(this, arguments);
    return c !== a && (l = (a = c) && Ua(e, c, n)), l;
  }
  return h._value = t, h;
}
function Xa(e, t, n) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (t == null) return this.tween(l, null);
  if (typeof t != "function") throw new Error();
  return this.tween(l, Wa(e, t, n ?? ""));
}
function Qa(e) {
  return function() {
    this.textContent = e;
  };
}
function Ya(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ja(e) {
  return this.tween("text", typeof e == "function" ? Ya(Or(this, "text", e)) : Qa(e == null ? "" : e + ""));
}
function Za(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ka(e) {
  var t, n;
  function l() {
    var a = e.apply(this, arguments);
    return a !== n && (t = (n = a) && Za(a)), t;
  }
  return l._value = e, l;
}
function Ha(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ka(e));
}
function eu() {
  for (var e = this._name, t = this._id, n = Qi(), l = this._groups, a = l.length, h = 0; h < a; ++h)
    for (var c = l[h], f = c.length, d, m = 0; m < f; ++m)
      if (d = c[m]) {
        var g = ht(d, t);
        er(d, e, n, m, c, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new _t(l, this._parents, e, n);
}
function tu() {
  var e, t, n = this, l = n._id, a = n.size();
  return new Promise(function(h, c) {
    var f = { value: c }, d = { value: function() {
      --a === 0 && h();
    } };
    n.each(function() {
      var m = wt(this, l), g = m.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(f), t._.interrupt.push(f), t._.end.push(d)), m.on = t;
    }), a === 0 && h();
  });
}
var nu = 0;
function _t(e, t, n, l) {
  this._groups = e, this._parents = t, this._name = n, this._id = l;
}
function Qi() {
  return ++nu;
}
var vt = mn.prototype;
_t.prototype = {
  constructor: _t,
  select: Oa,
  selectAll: Aa,
  selectChild: vt.selectChild,
  selectChildren: vt.selectChildren,
  filter: Ta,
  merge: Ra,
  selection: Ba,
  transition: eu,
  call: vt.call,
  nodes: vt.nodes,
  node: vt.node,
  size: vt.size,
  empty: vt.empty,
  each: vt.each,
  on: Pa,
  attr: da,
  attrTween: ya,
  style: qa,
  styleTween: Xa,
  text: Ja,
  textTween: Ha,
  remove: $a,
  tween: oa,
  delay: _a,
  duration: Sa,
  ease: Ma,
  easeVarying: La,
  end: tu,
  [Symbol.iterator]: vt[Symbol.iterator]
};
const si = (e) => +e;
function ru(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var iu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ru
};
function su(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function ou(e) {
  var t, n;
  e instanceof _t ? (t = e._id, e = e._name) : (t = Qi(), (n = iu).time = Pr(), e = e == null ? null : e + "");
  for (var l = this._groups, a = l.length, h = 0; h < a; ++h)
    for (var c = l[h], f = c.length, d, m = 0; m < f; ++m)
      (d = c[m]) && er(d, e, t, m, c, n || su(d, t));
  return new _t(l, this._parents, e, t);
}
mn.prototype.interrupt = ra;
mn.prototype.transition = ou;
const Sr = Math.PI, kr = 2 * Sr, Ot = 1e-6, lu = kr - Ot;
function Yi(e) {
  this._ += e[0];
  for (let t = 1, n = e.length; t < n; ++t)
    this._ += arguments[t] + e[t];
}
function au(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Yi;
  const n = 10 ** t;
  return function(l) {
    this._ += l[0];
    for (let a = 1, h = l.length; a < h; ++a)
      this._ += Math.round(arguments[a] * n) / n + l[a];
  };
}
class uu {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Yi : au(t);
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
    let c = this._x1, f = this._y1, d = l - t, m = a - n, g = c - t, b = f - n, _ = g * g + b * b;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = n}`;
    else if (_ > Ot) if (!(Math.abs(b * d - m * g) > Ot) || !h)
      this._append`L${this._x1 = t},${this._y1 = n}`;
    else {
      let R = l - c, z = a - f, F = d * d + m * m, $ = R * R + z * z, k = Math.sqrt(F), B = Math.sqrt(_), Z = h * Math.tan((Sr - Math.acos((F + _ - $) / (2 * k * B))) / 2), P = Z / B, D = Z / k;
      Math.abs(P - 1) > Ot && this._append`L${t + P * g},${n + P * b}`, this._append`A${h},${h},0,0,${+(b * R > g * z)},${this._x1 = t + D * d},${this._y1 = n + D * m}`;
    }
  }
  arc(t, n, l, a, h, c) {
    if (t = +t, n = +n, l = +l, c = !!c, l < 0) throw new Error(`negative radius: ${l}`);
    let f = l * Math.cos(a), d = l * Math.sin(a), m = t + f, g = n + d, b = 1 ^ c, _ = c ? a - h : h - a;
    this._x1 === null ? this._append`M${m},${g}` : (Math.abs(this._x1 - m) > Ot || Math.abs(this._y1 - g) > Ot) && this._append`L${m},${g}`, l && (_ < 0 && (_ = _ % kr + kr), _ > lu ? this._append`A${l},${l},0,1,${b},${t - f},${n - d}A${l},${l},0,1,${b},${this._x1 = m},${this._y1 = g}` : _ > Ot && this._append`A${l},${l},0,${+(_ >= Sr)},${b},${this._x1 = t + l * Math.cos(h)},${this._y1 = n + l * Math.sin(h)}`);
  }
  rect(t, n, l, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +n}h${l = +l}v${+a}h${-l}Z`;
  }
  toString() {
    return this._;
  }
}
function hu(e) {
  const t = +this._x.call(null, e), n = +this._y.call(null, e);
  return Ji(this.cover(t, n), t, n, e);
}
function Ji(e, t, n, l) {
  if (isNaN(t) || isNaN(n)) return e;
  var a, h = e._root, c = { data: l }, f = e._x0, d = e._y0, m = e._x1, g = e._y1, b, _, R, z, F, $, k, B;
  if (!h) return e._root = c, e;
  for (; h.length; )
    if ((F = t >= (b = (f + m) / 2)) ? f = b : m = b, ($ = n >= (_ = (d + g) / 2)) ? d = _ : g = _, a = h, !(h = h[k = $ << 1 | F])) return a[k] = c, e;
  if (R = +e._x.call(null, h.data), z = +e._y.call(null, h.data), t === R && n === z) return c.next = h, a ? a[k] = c : e._root = c, e;
  do
    a = a ? a[k] = new Array(4) : e._root = new Array(4), (F = t >= (b = (f + m) / 2)) ? f = b : m = b, ($ = n >= (_ = (d + g) / 2)) ? d = _ : g = _;
  while ((k = $ << 1 | F) === (B = (z >= _) << 1 | R >= b));
  return a[B] = h, a[k] = c, e;
}
function cu(e) {
  var t, n, l = e.length, a, h, c = new Array(l), f = new Array(l), d = 1 / 0, m = 1 / 0, g = -1 / 0, b = -1 / 0;
  for (n = 0; n < l; ++n)
    isNaN(a = +this._x.call(null, t = e[n])) || isNaN(h = +this._y.call(null, t)) || (c[n] = a, f[n] = h, a < d && (d = a), a > g && (g = a), h < m && (m = h), h > b && (b = h));
  if (d > g || m > b) return this;
  for (this.cover(d, m).cover(g, b), n = 0; n < l; ++n)
    Ji(this, c[n], f[n], e[n]);
  return this;
}
function fu(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, l = this._y0, a = this._x1, h = this._y1;
  if (isNaN(n))
    a = (n = Math.floor(e)) + 1, h = (l = Math.floor(t)) + 1;
  else {
    for (var c = a - n || 1, f = this._root, d, m; n > e || e >= a || l > t || t >= h; )
      switch (m = (t < l) << 1 | e < n, d = new Array(4), d[m] = f, f = d, c *= 2, m) {
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
function du() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function gu(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function qe(e, t, n, l, a) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = l, this.y1 = a;
}
function pu(e, t, n) {
  var l, a = this._x0, h = this._y0, c, f, d, m, g = this._x1, b = this._y1, _ = [], R = this._root, z, F;
  for (R && _.push(new qe(R, a, h, g, b)), n == null ? n = 1 / 0 : (a = e - n, h = t - n, g = e + n, b = t + n, n *= n); z = _.pop(); )
    if (!(!(R = z.node) || (c = z.x0) > g || (f = z.y0) > b || (d = z.x1) < a || (m = z.y1) < h))
      if (R.length) {
        var $ = (c + d) / 2, k = (f + m) / 2;
        _.push(
          new qe(R[3], $, k, d, m),
          new qe(R[2], c, k, $, m),
          new qe(R[1], $, f, d, k),
          new qe(R[0], c, f, $, k)
        ), (F = (t >= k) << 1 | e >= $) && (z = _[_.length - 1], _[_.length - 1] = _[_.length - 1 - F], _[_.length - 1 - F] = z);
      } else {
        var B = e - +this._x.call(null, R.data), Z = t - +this._y.call(null, R.data), P = B * B + Z * Z;
        if (P < n) {
          var D = Math.sqrt(n = P);
          a = e - D, h = t - D, g = e + D, b = t + D, l = R.data;
        }
      }
  return l;
}
function mu(e) {
  if (isNaN(g = +this._x.call(null, e)) || isNaN(b = +this._y.call(null, e))) return this;
  var t, n = this._root, l, a, h, c = this._x0, f = this._y0, d = this._x1, m = this._y1, g, b, _, R, z, F, $, k;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((z = g >= (_ = (c + d) / 2)) ? c = _ : d = _, (F = b >= (R = (f + m) / 2)) ? f = R : m = R, t = n, !(n = n[$ = F << 1 | z])) return this;
    if (!n.length) break;
    (t[$ + 1 & 3] || t[$ + 2 & 3] || t[$ + 3 & 3]) && (l = t, k = $);
  }
  for (; n.data !== e; ) if (a = n, !(n = n.next)) return this;
  return (h = n.next) && delete n.next, a ? (h ? a.next = h : delete a.next, this) : t ? (h ? t[$] = h : delete t[$], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (l ? l[k] = n : this._root = n), this) : (this._root = h, this);
}
function wu(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function yu() {
  return this._root;
}
function vu() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function bu(e) {
  var t = [], n, l = this._root, a, h, c, f, d;
  for (l && t.push(new qe(l, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(l = n.node, h = n.x0, c = n.y0, f = n.x1, d = n.y1) && l.length) {
      var m = (h + f) / 2, g = (c + d) / 2;
      (a = l[3]) && t.push(new qe(a, m, g, f, d)), (a = l[2]) && t.push(new qe(a, h, g, m, d)), (a = l[1]) && t.push(new qe(a, m, c, f, g)), (a = l[0]) && t.push(new qe(a, h, c, m, g));
    }
  return this;
}
function _u(e) {
  var t = [], n = [], l;
  for (this._root && t.push(new qe(this._root, this._x0, this._y0, this._x1, this._y1)); l = t.pop(); ) {
    var a = l.node;
    if (a.length) {
      var h, c = l.x0, f = l.y0, d = l.x1, m = l.y1, g = (c + d) / 2, b = (f + m) / 2;
      (h = a[0]) && t.push(new qe(h, c, f, g, b)), (h = a[1]) && t.push(new qe(h, g, f, d, b)), (h = a[2]) && t.push(new qe(h, c, b, g, m)), (h = a[3]) && t.push(new qe(h, g, b, d, m));
    }
    n.push(l);
  }
  for (; l = n.pop(); )
    e(l.node, l.x0, l.y0, l.x1, l.y1);
  return this;
}
function xu(e) {
  return e[0];
}
function Eu(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Su(e) {
  return e[1];
}
function ku(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function Ar(e, t, n) {
  var l = new Fr(t ?? xu, n ?? Su, NaN, NaN, NaN, NaN);
  return e == null ? l : l.addAll(e);
}
function Fr(e, t, n, l, a, h) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this._root = void 0;
}
function oi(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Xe = Ar.prototype = Fr.prototype;
Xe.copy = function() {
  var e = new Fr(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, l;
  if (!t) return e;
  if (!t.length) return e._root = oi(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var a = 0; a < 4; ++a)
      (l = t.source[a]) && (l.length ? n.push({ source: l, target: t.target[a] = new Array(4) }) : t.target[a] = oi(l));
  return e;
};
Xe.add = hu;
Xe.addAll = cu;
Xe.cover = fu;
Xe.data = du;
Xe.extent = gu;
Xe.find = pu;
Xe.remove = mu;
Xe.removeAll = wu;
Xe.root = yu;
Xe.size = vu;
Xe.visit = bu;
Xe.visitAfter = _u;
Xe.x = Eu;
Xe.y = ku;
function We(e) {
  return function() {
    return e;
  };
}
function Lt(e) {
  return (e() - 0.5) * 1e-6;
}
function Mu(e) {
  return e.x + e.vx;
}
function Nu(e) {
  return e.y + e.vy;
}
function Lu(e) {
  var t, n, l, a = 1, h = 1;
  typeof e != "function" && (e = We(e == null ? 1 : +e));
  function c() {
    for (var m, g = t.length, b, _, R, z, F, $, k = 0; k < h; ++k)
      for (b = Ar(t, Mu, Nu).visitAfter(f), m = 0; m < g; ++m)
        _ = t[m], F = n[_.index], $ = F * F, R = _.x + _.vx, z = _.y + _.vy, b.visit(B);
    function B(Z, P, D, te, ne) {
      var he = Z.data, ge = Z.r, re = F + ge;
      if (he) {
        if (he.index > _.index) {
          var de = R - he.x - he.vx, ye = z - he.y - he.vy, ae = de * de + ye * ye;
          ae < re * re && (de === 0 && (de = Lt(l), ae += de * de), ye === 0 && (ye = Lt(l), ae += ye * ye), ae = (re - (ae = Math.sqrt(ae))) / ae * a, _.vx += (de *= ae) * (re = (ge *= ge) / ($ + ge)), _.vy += (ye *= ae) * re, he.vx -= de * (re = 1 - re), he.vy -= ye * re);
        }
        return;
      }
      return P > R + re || te < R - re || D > z + re || ne < z - re;
    }
  }
  function f(m) {
    if (m.data) return m.r = n[m.data.index];
    for (var g = m.r = 0; g < 4; ++g)
      m[g] && m[g].r > m.r && (m.r = m[g].r);
  }
  function d() {
    if (t) {
      var m, g = t.length, b;
      for (n = new Array(g), m = 0; m < g; ++m) b = t[m], n[b.index] = +e(b, m, t);
    }
  }
  return c.initialize = function(m, g) {
    t = m, l = g, d();
  }, c.iterations = function(m) {
    return arguments.length ? (h = +m, c) : h;
  }, c.strength = function(m) {
    return arguments.length ? (a = +m, c) : a;
  }, c.radius = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : We(+m), d(), c) : e;
  }, c;
}
function Tu(e) {
  return e.index;
}
function li(e, t) {
  var n = e.get(t);
  if (!n) throw new Error("node not found: " + t);
  return n;
}
function Ru(e) {
  var t = Tu, n = b, l, a = We(30), h, c, f, d, m, g = 1;
  e == null && (e = []);
  function b($) {
    return 1 / Math.min(f[$.source.index], f[$.target.index]);
  }
  function _($) {
    for (var k = 0, B = e.length; k < g; ++k)
      for (var Z = 0, P, D, te, ne, he, ge, re; Z < B; ++Z)
        P = e[Z], D = P.source, te = P.target, ne = te.x + te.vx - D.x - D.vx || Lt(m), he = te.y + te.vy - D.y - D.vy || Lt(m), ge = Math.sqrt(ne * ne + he * he), ge = (ge - h[Z]) / ge * $ * l[Z], ne *= ge, he *= ge, te.vx -= ne * (re = d[Z]), te.vy -= he * re, D.vx += ne * (re = 1 - re), D.vy += he * re;
  }
  function R() {
    if (c) {
      var $, k = c.length, B = e.length, Z = new Map(c.map((D, te) => [t(D, te, c), D])), P;
      for ($ = 0, f = new Array(k); $ < B; ++$)
        P = e[$], P.index = $, typeof P.source != "object" && (P.source = li(Z, P.source)), typeof P.target != "object" && (P.target = li(Z, P.target)), f[P.source.index] = (f[P.source.index] || 0) + 1, f[P.target.index] = (f[P.target.index] || 0) + 1;
      for ($ = 0, d = new Array(B); $ < B; ++$)
        P = e[$], d[$] = f[P.source.index] / (f[P.source.index] + f[P.target.index]);
      l = new Array(B), z(), h = new Array(B), F();
    }
  }
  function z() {
    if (c)
      for (var $ = 0, k = e.length; $ < k; ++$)
        l[$] = +n(e[$], $, e);
  }
  function F() {
    if (c)
      for (var $ = 0, k = e.length; $ < k; ++$)
        h[$] = +a(e[$], $, e);
  }
  return _.initialize = function($, k) {
    c = $, m = k, R();
  }, _.links = function($) {
    return arguments.length ? (e = $, R(), _) : e;
  }, _.id = function($) {
    return arguments.length ? (t = $, _) : t;
  }, _.iterations = function($) {
    return arguments.length ? (g = +$, _) : g;
  }, _.strength = function($) {
    return arguments.length ? (n = typeof $ == "function" ? $ : We(+$), z(), _) : n;
  }, _.distance = function($) {
    return arguments.length ? (a = typeof $ == "function" ? $ : We(+$), F(), _) : a;
  }, _;
}
const Cu = 1664525, Iu = 1013904223, ai = 4294967296;
function Pu() {
  let e = 1;
  return () => (e = (Cu * e + Iu) % ai) / ai;
}
function zu(e) {
  return e.x;
}
function $u(e) {
  return e.y;
}
var Ou = 10, Au = Math.PI * (3 - Math.sqrt(5));
function Fu(e) {
  var t, n = 1, l = 1e-3, a = 1 - Math.pow(l, 1 / 300), h = 0, c = 0.6, f = /* @__PURE__ */ new Map(), d = zr(b), m = pn("tick", "end"), g = Pu();
  e == null && (e = []);
  function b() {
    _(), m.call("tick", t), n < l && (d.stop(), m.call("end", t));
  }
  function _(F) {
    var $, k = e.length, B;
    F === void 0 && (F = 1);
    for (var Z = 0; Z < F; ++Z)
      for (n += (h - n) * a, f.forEach(function(P) {
        P(n);
      }), $ = 0; $ < k; ++$)
        B = e[$], B.fx == null ? B.x += B.vx *= c : (B.x = B.fx, B.vx = 0), B.fy == null ? B.y += B.vy *= c : (B.y = B.fy, B.vy = 0);
    return t;
  }
  function R() {
    for (var F = 0, $ = e.length, k; F < $; ++F) {
      if (k = e[F], k.index = F, k.fx != null && (k.x = k.fx), k.fy != null && (k.y = k.fy), isNaN(k.x) || isNaN(k.y)) {
        var B = Ou * Math.sqrt(0.5 + F), Z = F * Au;
        k.x = B * Math.cos(Z), k.y = B * Math.sin(Z);
      }
      (isNaN(k.vx) || isNaN(k.vy)) && (k.vx = k.vy = 0);
    }
  }
  function z(F) {
    return F.initialize && F.initialize(e, g), F;
  }
  return R(), t = {
    tick: _,
    restart: function() {
      return d.restart(b), t;
    },
    stop: function() {
      return d.stop(), t;
    },
    nodes: function(F) {
      return arguments.length ? (e = F, R(), f.forEach(z), t) : e;
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
      return arguments.length ? (g = F, f.forEach(z), t) : g;
    },
    force: function(F, $) {
      return arguments.length > 1 ? ($ == null ? f.delete(F) : f.set(F, z($)), t) : f.get(F);
    },
    find: function(F, $, k) {
      var B = 0, Z = e.length, P, D, te, ne, he;
      for (k == null ? k = 1 / 0 : k *= k, B = 0; B < Z; ++B)
        ne = e[B], P = F - ne.x, D = $ - ne.y, te = P * P + D * D, te < k && (he = ne, k = te);
      return he;
    },
    on: function(F, $) {
      return arguments.length > 1 ? (m.on(F, $), t) : m.on(F);
    }
  };
}
function Bu() {
  var e, t, n, l, a = We(-30), h, c = 1, f = 1 / 0, d = 0.81;
  function m(R) {
    var z, F = e.length, $ = Ar(e, zu, $u).visitAfter(b);
    for (l = R, z = 0; z < F; ++z) t = e[z], $.visit(_);
  }
  function g() {
    if (e) {
      var R, z = e.length, F;
      for (h = new Array(z), R = 0; R < z; ++R) F = e[R], h[F.index] = +a(F, R, e);
    }
  }
  function b(R) {
    var z = 0, F, $, k = 0, B, Z, P;
    if (R.length) {
      for (B = Z = P = 0; P < 4; ++P)
        (F = R[P]) && ($ = Math.abs(F.value)) && (z += F.value, k += $, B += $ * F.x, Z += $ * F.y);
      R.x = B / k, R.y = Z / k;
    } else {
      F = R, F.x = F.data.x, F.y = F.data.y;
      do
        z += h[F.data.index];
      while (F = F.next);
    }
    R.value = z;
  }
  function _(R, z, F, $) {
    if (!R.value) return !0;
    var k = R.x - t.x, B = R.y - t.y, Z = $ - z, P = k * k + B * B;
    if (Z * Z / d < P)
      return P < f && (k === 0 && (k = Lt(n), P += k * k), B === 0 && (B = Lt(n), P += B * B), P < c && (P = Math.sqrt(c * P)), t.vx += k * R.value * l / P, t.vy += B * R.value * l / P), !0;
    if (R.length || P >= f) return;
    (R.data !== t || R.next) && (k === 0 && (k = Lt(n), P += k * k), B === 0 && (B = Lt(n), P += B * B), P < c && (P = Math.sqrt(c * P)));
    do
      R.data !== t && (Z = h[R.data.index] * l / P, t.vx += k * Z, t.vy += B * Z);
    while (R = R.next);
  }
  return m.initialize = function(R, z) {
    e = R, n = z, g();
  }, m.strength = function(R) {
    return arguments.length ? (a = typeof R == "function" ? R : We(+R), g(), m) : a;
  }, m.distanceMin = function(R) {
    return arguments.length ? (c = R * R, m) : Math.sqrt(c);
  }, m.distanceMax = function(R) {
    return arguments.length ? (f = R * R, m) : Math.sqrt(f);
  }, m.theta = function(R) {
    return arguments.length ? (d = R * R, m) : Math.sqrt(d);
  }, m;
}
function ju(e) {
  var t = We(0.1), n, l, a;
  typeof e != "function" && (e = We(e == null ? 0 : +e));
  function h(f) {
    for (var d = 0, m = n.length, g; d < m; ++d)
      g = n[d], g.vx += (a[d] - g.x) * l[d] * f;
  }
  function c() {
    if (n) {
      var f, d = n.length;
      for (l = new Array(d), a = new Array(d), f = 0; f < d; ++f)
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
function Du(e) {
  var t = We(0.1), n, l, a;
  typeof e != "function" && (e = We(e == null ? 0 : +e));
  function h(f) {
    for (var d = 0, m = n.length, g; d < m; ++d)
      g = n[d], g.vy += (a[d] - g.y) * l[d] * f;
  }
  function c() {
    if (n) {
      var f, d = n.length;
      for (l = new Array(d), a = new Array(d), f = 0; f < d; ++f)
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
const ui = Math.abs, je = Math.atan2, Pt = Math.cos, Gu = Math.max, cr = Math.min, gt = Math.sin, Vt = Math.sqrt, Ye = 1e-12, fn = Math.PI, Yn = fn / 2, Vu = 2 * fn;
function qu(e) {
  return e > 1 ? 0 : e < -1 ? fn : Math.acos(e);
}
function hi(e) {
  return e >= 1 ? Yn : e <= -1 ? -Yn : Math.asin(e);
}
function Zi(e) {
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
  }, () => new uu(t);
}
function Uu(e) {
  return e.innerRadius;
}
function Wu(e) {
  return e.outerRadius;
}
function Xu(e) {
  return e.startAngle;
}
function Qu(e) {
  return e.endAngle;
}
function Yu(e) {
  return e && e.padAngle;
}
function Ju(e, t, n, l, a, h, c, f) {
  var d = n - e, m = l - t, g = c - a, b = f - h, _ = b * d - g * m;
  if (!(_ * _ < Ye))
    return _ = (g * (t - h) - b * (e - a)) / _, [e + _ * d, t + _ * m];
}
function Rn(e, t, n, l, a, h, c) {
  var f = e - n, d = t - l, m = (c ? h : -h) / Vt(f * f + d * d), g = m * d, b = -m * f, _ = e + g, R = t + b, z = n + g, F = l + b, $ = (_ + z) / 2, k = (R + F) / 2, B = z - _, Z = F - R, P = B * B + Z * Z, D = a - h, te = _ * F - z * R, ne = (Z < 0 ? -1 : 1) * Vt(Gu(0, D * D * P - te * te)), he = (te * Z - B * ne) / P, ge = (-te * B - Z * ne) / P, re = (te * Z + B * ne) / P, de = (-te * B + Z * ne) / P, ye = he - $, ae = ge - k, A = re - $, ee = de - k;
  return ye * ye + ae * ae > A * A + ee * ee && (he = re, ge = de), {
    cx: he,
    cy: ge,
    x01: -g,
    y01: -b,
    x11: he * (a / D - 1),
    y11: ge * (a / D - 1)
  };
}
function Zu() {
  var e = Uu, t = Wu, n = Je(0), l = null, a = Xu, h = Qu, c = Yu, f = null, d = Zi(m);
  function m() {
    var g, b, _ = +e.apply(this, arguments), R = +t.apply(this, arguments), z = a.apply(this, arguments) - Yn, F = h.apply(this, arguments) - Yn, $ = ui(F - z), k = F > z;
    if (f || (f = g = d()), R < _ && (b = R, R = _, _ = b), !(R > Ye)) f.moveTo(0, 0);
    else if ($ > Vu - Ye)
      f.moveTo(R * Pt(z), R * gt(z)), f.arc(0, 0, R, z, F, !k), _ > Ye && (f.moveTo(_ * Pt(F), _ * gt(F)), f.arc(0, 0, _, F, z, k));
    else {
      var B = z, Z = F, P = z, D = F, te = $, ne = $, he = c.apply(this, arguments) / 2, ge = he > Ye && (l ? +l.apply(this, arguments) : Vt(_ * _ + R * R)), re = cr(ui(R - _) / 2, +n.apply(this, arguments)), de = re, ye = re, ae, A;
      if (ge > Ye) {
        var ee = hi(ge / _ * gt(he)), W = hi(ge / R * gt(he));
        (te -= ee * 2) > Ye ? (ee *= k ? 1 : -1, P += ee, D -= ee) : (te = 0, P = D = (z + F) / 2), (ne -= W * 2) > Ye ? (W *= k ? 1 : -1, B += W, Z -= W) : (ne = 0, B = Z = (z + F) / 2);
      }
      var oe = R * Pt(B), ue = R * gt(B), fe = _ * Pt(D), pe = _ * gt(D);
      if (re > Ye) {
        var me = R * Pt(Z), ie = R * gt(Z), Re = _ * Pt(P), Se = _ * gt(P), Q;
        if ($ < fn)
          if (Q = Ju(oe, ue, Re, Se, me, ie, fe, pe)) {
            var Me = oe - Q[0], Le = ue - Q[1], xe = me - Q[0], Oe = ie - Q[1], ct = 1 / gt(qu((Me * xe + Le * Oe) / (Vt(Me * Me + Le * Le) * Vt(xe * xe + Oe * Oe))) / 2), ft = Vt(Q[0] * Q[0] + Q[1] * Q[1]);
            de = cr(re, (_ - ft) / (ct - 1)), ye = cr(re, (R - ft) / (ct + 1));
          } else
            de = ye = 0;
      }
      ne > Ye ? ye > Ye ? (ae = Rn(Re, Se, oe, ue, R, ye, k), A = Rn(me, ie, fe, pe, R, ye, k), f.moveTo(ae.cx + ae.x01, ae.cy + ae.y01), ye < re ? f.arc(ae.cx, ae.cy, ye, je(ae.y01, ae.x01), je(A.y01, A.x01), !k) : (f.arc(ae.cx, ae.cy, ye, je(ae.y01, ae.x01), je(ae.y11, ae.x11), !k), f.arc(0, 0, R, je(ae.cy + ae.y11, ae.cx + ae.x11), je(A.cy + A.y11, A.cx + A.x11), !k), f.arc(A.cx, A.cy, ye, je(A.y11, A.x11), je(A.y01, A.x01), !k))) : (f.moveTo(oe, ue), f.arc(0, 0, R, B, Z, !k)) : f.moveTo(oe, ue), !(_ > Ye) || !(te > Ye) ? f.lineTo(fe, pe) : de > Ye ? (ae = Rn(fe, pe, me, ie, _, -de, k), A = Rn(oe, ue, Re, Se, _, -de, k), f.lineTo(ae.cx + ae.x01, ae.cy + ae.y01), de < re ? f.arc(ae.cx, ae.cy, de, je(ae.y01, ae.x01), je(A.y01, A.x01), !k) : (f.arc(ae.cx, ae.cy, de, je(ae.y01, ae.x01), je(ae.y11, ae.x11), !k), f.arc(0, 0, _, je(ae.cy + ae.y11, ae.cx + ae.x11), je(A.cy + A.y11, A.cx + A.x11), k), f.arc(A.cx, A.cy, de, je(A.y11, A.x11), je(A.y01, A.x01), !k))) : f.arc(0, 0, _, D, P, k);
    }
    if (f.closePath(), g) return f = null, g + "" || null;
  }
  return m.centroid = function() {
    var g = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, b = (+a.apply(this, arguments) + +h.apply(this, arguments)) / 2 - fn / 2;
    return [Pt(b) * g, gt(b) * g];
  }, m.innerRadius = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : Je(+g), m) : e;
  }, m.outerRadius = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : Je(+g), m) : t;
  }, m.cornerRadius = function(g) {
    return arguments.length ? (n = typeof g == "function" ? g : Je(+g), m) : n;
  }, m.padRadius = function(g) {
    return arguments.length ? (l = g == null ? null : typeof g == "function" ? g : Je(+g), m) : l;
  }, m.startAngle = function(g) {
    return arguments.length ? (a = typeof g == "function" ? g : Je(+g), m) : a;
  }, m.endAngle = function(g) {
    return arguments.length ? (h = typeof g == "function" ? g : Je(+g), m) : h;
  }, m.padAngle = function(g) {
    return arguments.length ? (c = typeof g == "function" ? g : Je(+g), m) : c;
  }, m.context = function(g) {
    return arguments.length ? (f = g ?? null, m) : f;
  }, m;
}
function Ku(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ki(e) {
  this._context = e;
}
Ki.prototype = {
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
function Hu(e) {
  return new Ki(e);
}
function eh(e) {
  return e[0];
}
function th(e) {
  return e[1];
}
function nh(e, t) {
  var n = Je(!0), l = null, a = Hu, h = null, c = Zi(f);
  e = typeof e == "function" ? e : e === void 0 ? eh : Je(e), t = typeof t == "function" ? t : t === void 0 ? th : Je(t);
  function f(d) {
    var m, g = (d = Ku(d)).length, b, _ = !1, R;
    for (l == null && (h = a(R = c())), m = 0; m <= g; ++m)
      !(m < g && n(b = d[m], m, d)) === _ && ((_ = !_) ? h.lineStart() : h.lineEnd()), _ && h.point(+e(b, m, d), +t(b, m, d));
    if (R) return h = null, R + "" || null;
  }
  return f.x = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Je(+d), f) : e;
  }, f.y = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Je(+d), f) : t;
  }, f.defined = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : Je(!!d), f) : n;
  }, f.curve = function(d) {
    return arguments.length ? (a = d, l != null && (h = a(l)), f) : a;
  }, f.context = function(d) {
    return arguments.length ? (d == null ? l = h = null : h = a(l = d), f) : l;
  }, f;
}
const Cn = (e) => () => e;
function rh(e, {
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
function bt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
bt.prototype = {
  constructor: bt,
  scale: function(e) {
    return e === 1 ? this : new bt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new bt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Hi = new bt(1, 0, 0);
bt.prototype;
function fr(e) {
  e.stopImmediatePropagation();
}
function tn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ih(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function sh() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ci() {
  return this.__zoom || Hi;
}
function oh(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function lh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ah(e, t, n) {
  var l = e.invertX(t[0][0]) - n[0][0], a = e.invertX(t[1][0]) - n[1][0], h = e.invertY(t[0][1]) - n[0][1], c = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    a > l ? (l + a) / 2 : Math.min(0, l) || Math.max(0, a),
    c > h ? (h + c) / 2 : Math.min(0, h) || Math.max(0, c)
  );
}
function uh() {
  var e = ih, t = sh, n = ah, l = oh, a = lh, h = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], f = 250, d = Yl, m = pn("start", "zoom", "end"), g, b, _, R = 500, z = 150, F = 0, $ = 10;
  function k(A) {
    A.property("__zoom", ci).on("wheel.zoom", he, { passive: !1 }).on("mousedown.zoom", ge).on("dblclick.zoom", re).filter(a).on("touchstart.zoom", de).on("touchmove.zoom", ye).on("touchend.zoom touchcancel.zoom", ae).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  k.transform = function(A, ee, W, oe) {
    var ue = A.selection ? A.selection() : A;
    ue.property("__zoom", ci), A !== ue ? D(A, ee, W, oe) : ue.interrupt().each(function() {
      te(this, arguments).event(oe).start().zoom(null, typeof ee == "function" ? ee.apply(this, arguments) : ee).end();
    });
  }, k.scaleBy = function(A, ee, W, oe) {
    k.scaleTo(A, function() {
      var ue = this.__zoom.k, fe = typeof ee == "function" ? ee.apply(this, arguments) : ee;
      return ue * fe;
    }, W, oe);
  }, k.scaleTo = function(A, ee, W, oe) {
    k.transform(A, function() {
      var ue = t.apply(this, arguments), fe = this.__zoom, pe = W == null ? P(ue) : typeof W == "function" ? W.apply(this, arguments) : W, me = fe.invert(pe), ie = typeof ee == "function" ? ee.apply(this, arguments) : ee;
      return n(Z(B(fe, ie), pe, me), ue, c);
    }, W, oe);
  }, k.translateBy = function(A, ee, W, oe) {
    k.transform(A, function() {
      return n(this.__zoom.translate(
        typeof ee == "function" ? ee.apply(this, arguments) : ee,
        typeof W == "function" ? W.apply(this, arguments) : W
      ), t.apply(this, arguments), c);
    }, null, oe);
  }, k.translateTo = function(A, ee, W, oe, ue) {
    k.transform(A, function() {
      var fe = t.apply(this, arguments), pe = this.__zoom, me = oe == null ? P(fe) : typeof oe == "function" ? oe.apply(this, arguments) : oe;
      return n(Hi.translate(me[0], me[1]).scale(pe.k).translate(
        typeof ee == "function" ? -ee.apply(this, arguments) : -ee,
        typeof W == "function" ? -W.apply(this, arguments) : -W
      ), fe, c);
    }, oe, ue);
  };
  function B(A, ee) {
    return ee = Math.max(h[0], Math.min(h[1], ee)), ee === A.k ? A : new bt(ee, A.x, A.y);
  }
  function Z(A, ee, W) {
    var oe = ee[0] - W[0] * A.k, ue = ee[1] - W[1] * A.k;
    return oe === A.x && ue === A.y ? A : new bt(A.k, oe, ue);
  }
  function P(A) {
    return [(+A[0][0] + +A[1][0]) / 2, (+A[0][1] + +A[1][1]) / 2];
  }
  function D(A, ee, W, oe) {
    A.on("start.zoom", function() {
      te(this, arguments).event(oe).start();
    }).on("interrupt.zoom end.zoom", function() {
      te(this, arguments).event(oe).end();
    }).tween("zoom", function() {
      var ue = this, fe = arguments, pe = te(ue, fe).event(oe), me = t.apply(ue, fe), ie = W == null ? P(me) : typeof W == "function" ? W.apply(ue, fe) : W, Re = Math.max(me[1][0] - me[0][0], me[1][1] - me[0][1]), Se = ue.__zoom, Q = typeof ee == "function" ? ee.apply(ue, fe) : ee, Me = d(Se.invert(ie).concat(Re / Se.k), Q.invert(ie).concat(Re / Q.k));
      return function(Le) {
        if (Le === 1) Le = Q;
        else {
          var xe = Me(Le), Oe = Re / xe[2];
          Le = new bt(Oe, ie[0] - xe[0] * Oe, ie[1] - xe[1] * Oe);
        }
        pe.zoom(null, Le);
      };
    });
  }
  function te(A, ee, W) {
    return !W && A.__zooming || new ne(A, ee);
  }
  function ne(A, ee) {
    this.that = A, this.args = ee, this.active = 0, this.sourceEvent = null, this.extent = t.apply(A, ee), this.taps = 0;
  }
  ne.prototype = {
    event: function(A) {
      return A && (this.sourceEvent = A), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(A, ee) {
      return this.mouse && A !== "mouse" && (this.mouse[1] = ee.invert(this.mouse[0])), this.touch0 && A !== "touch" && (this.touch0[1] = ee.invert(this.touch0[0])), this.touch1 && A !== "touch" && (this.touch1[1] = ee.invert(this.touch1[0])), this.that.__zoom = ee, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(A) {
      var ee = be(this.that).datum();
      m.call(
        A,
        this.that,
        new rh(A, {
          sourceEvent: this.sourceEvent,
          target: k,
          transform: this.that.__zoom,
          dispatch: m
        }),
        ee
      );
    }
  };
  function he(A, ...ee) {
    if (!e.apply(this, arguments)) return;
    var W = te(this, ee).event(A), oe = this.__zoom, ue = Math.max(h[0], Math.min(h[1], oe.k * Math.pow(2, l.apply(this, arguments)))), fe = it(A);
    if (W.wheel)
      (W.mouse[0][0] !== fe[0] || W.mouse[0][1] !== fe[1]) && (W.mouse[1] = oe.invert(W.mouse[0] = fe)), clearTimeout(W.wheel);
    else {
      if (oe.k === ue) return;
      W.mouse = [fe, oe.invert(fe)], Bn(this), W.start();
    }
    tn(A), W.wheel = setTimeout(pe, z), W.zoom("mouse", n(Z(B(oe, ue), W.mouse[0], W.mouse[1]), W.extent, c));
    function pe() {
      W.wheel = null, W.end();
    }
  }
  function ge(A, ...ee) {
    if (_ || !e.apply(this, arguments)) return;
    var W = A.currentTarget, oe = te(this, ee, !0).event(A), ue = be(A.view).on("mousemove.zoom", ie, !0).on("mouseup.zoom", Re, !0), fe = it(A, W), pe = A.clientX, me = A.clientY;
    $i(A.view), fr(A), oe.mouse = [fe, this.__zoom.invert(fe)], Bn(this), oe.start();
    function ie(Se) {
      if (tn(Se), !oe.moved) {
        var Q = Se.clientX - pe, Me = Se.clientY - me;
        oe.moved = Q * Q + Me * Me > F;
      }
      oe.event(Se).zoom("mouse", n(Z(oe.that.__zoom, oe.mouse[0] = it(Se, W), oe.mouse[1]), oe.extent, c));
    }
    function Re(Se) {
      ue.on("mousemove.zoom mouseup.zoom", null), Oi(Se.view, oe.moved), tn(Se), oe.event(Se).end();
    }
  }
  function re(A, ...ee) {
    if (e.apply(this, arguments)) {
      var W = this.__zoom, oe = it(A.changedTouches ? A.changedTouches[0] : A, this), ue = W.invert(oe), fe = W.k * (A.shiftKey ? 0.5 : 2), pe = n(Z(B(W, fe), oe, ue), t.apply(this, ee), c);
      tn(A), f > 0 ? be(this).transition().duration(f).call(D, pe, oe, A) : be(this).call(k.transform, pe, oe, A);
    }
  }
  function de(A, ...ee) {
    if (e.apply(this, arguments)) {
      var W = A.touches, oe = W.length, ue = te(this, ee, A.changedTouches.length === oe).event(A), fe, pe, me, ie;
      for (fr(A), pe = 0; pe < oe; ++pe)
        me = W[pe], ie = it(me, this), ie = [ie, this.__zoom.invert(ie), me.identifier], ue.touch0 ? !ue.touch1 && ue.touch0[2] !== ie[2] && (ue.touch1 = ie, ue.taps = 0) : (ue.touch0 = ie, fe = !0, ue.taps = 1 + !!g);
      g && (g = clearTimeout(g)), fe && (ue.taps < 2 && (b = ie[0], g = setTimeout(function() {
        g = null;
      }, R)), Bn(this), ue.start());
    }
  }
  function ye(A, ...ee) {
    if (this.__zooming) {
      var W = te(this, ee).event(A), oe = A.changedTouches, ue = oe.length, fe, pe, me, ie;
      for (tn(A), fe = 0; fe < ue; ++fe)
        pe = oe[fe], me = it(pe, this), W.touch0 && W.touch0[2] === pe.identifier ? W.touch0[0] = me : W.touch1 && W.touch1[2] === pe.identifier && (W.touch1[0] = me);
      if (pe = W.that.__zoom, W.touch1) {
        var Re = W.touch0[0], Se = W.touch0[1], Q = W.touch1[0], Me = W.touch1[1], Le = (Le = Q[0] - Re[0]) * Le + (Le = Q[1] - Re[1]) * Le, xe = (xe = Me[0] - Se[0]) * xe + (xe = Me[1] - Se[1]) * xe;
        pe = B(pe, Math.sqrt(Le / xe)), me = [(Re[0] + Q[0]) / 2, (Re[1] + Q[1]) / 2], ie = [(Se[0] + Me[0]) / 2, (Se[1] + Me[1]) / 2];
      } else if (W.touch0) me = W.touch0[0], ie = W.touch0[1];
      else return;
      W.zoom("touch", n(Z(pe, me, ie), W.extent, c));
    }
  }
  function ae(A, ...ee) {
    if (this.__zooming) {
      var W = te(this, ee).event(A), oe = A.changedTouches, ue = oe.length, fe, pe;
      for (fr(A), _ && clearTimeout(_), _ = setTimeout(function() {
        _ = null;
      }, R), fe = 0; fe < ue; ++fe)
        pe = oe[fe], W.touch0 && W.touch0[2] === pe.identifier ? delete W.touch0 : W.touch1 && W.touch1[2] === pe.identifier && delete W.touch1;
      if (W.touch1 && !W.touch0 && (W.touch0 = W.touch1, delete W.touch1), W.touch0) W.touch0[1] = this.__zoom.invert(W.touch0[0]);
      else if (W.end(), W.taps === 2 && (pe = it(pe, this), Math.hypot(b[0] - pe[0], b[1] - pe[1]) < $)) {
        var me = be(this).on("dblclick.zoom");
        me && me.apply(this, arguments);
      }
    }
  }
  return k.wheelDelta = function(A) {
    return arguments.length ? (l = typeof A == "function" ? A : Cn(+A), k) : l;
  }, k.filter = function(A) {
    return arguments.length ? (e = typeof A == "function" ? A : Cn(!!A), k) : e;
  }, k.touchable = function(A) {
    return arguments.length ? (a = typeof A == "function" ? A : Cn(!!A), k) : a;
  }, k.extent = function(A) {
    return arguments.length ? (t = typeof A == "function" ? A : Cn([[+A[0][0], +A[0][1]], [+A[1][0], +A[1][1]]]), k) : t;
  }, k.scaleExtent = function(A) {
    return arguments.length ? (h[0] = +A[0], h[1] = +A[1], k) : [h[0], h[1]];
  }, k.translateExtent = function(A) {
    return arguments.length ? (c[0][0] = +A[0][0], c[1][0] = +A[1][0], c[0][1] = +A[0][1], c[1][1] = +A[1][1], k) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, k.constrain = function(A) {
    return arguments.length ? (n = A, k) : n;
  }, k.duration = function(A) {
    return arguments.length ? (f = +A, k) : f;
  }, k.interpolate = function(A) {
    return arguments.length ? (d = A, k) : d;
  }, k.on = function() {
    var A = m.on.apply(m, arguments);
    return A === m ? k : A;
  }, k.clickDistance = function(A) {
    return arguments.length ? (F = (A = +A) * A, k) : Math.sqrt(F);
  }, k.tapDistance = function(A) {
    return arguments.length ? ($ = +A, k) : $;
  }, k;
}
function hh(e, t) {
  let n = uh().filter((l) => l.button === 0 || l.touches?.length >= 2);
  return ch(n, e, t);
}
function ch(e, t, n) {
  return n ? e.scaleExtent([0.5, 5]).on("zoom", (l) => t(l, !0)) : e.scaleExtent([1, 1]).on("zoom", (l) => t(l, !1));
}
var ce = /* @__PURE__ */ ((e) => (e.CIRCLE = "circle", e.RECTANGLE = "rect", e))(ce || {}), _e = /* @__PURE__ */ ((e) => (e.RIGHT = "RIGHT", e.BOTTOMRIGHT = "BOTTOMRIGHT", e.BOTTOM = "BOTTOM", e.BOTTOMLEFT = "BOTTOMLEFT", e.LEFT = "LEFT", e.TOPLEFT = "TOPLEFT", e.TOP = "TOP", e.TOPRIGHT = "TOPRIGHT", e))(_e || {});
class fh {
  // private _nodeProps: NodeProps = { shape: NodeShape.CIRCLE, radius: 48 }
  _nodeProps = {
    shape: ce.RECTANGLE,
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
    this.nodeProps.shape === ce.CIRCLE ? typeof t == "number" ? this.nodeProps.radius = t : this.nodeProps.radius = t.radius ?? 24 : this.nodeProps.shape === ce.RECTANGLE && (typeof t == "number" ? (this.nodeProps.width = t, this.nodeProps.height = t) : (this.nodeProps.width = t.width ?? 48, this.nodeProps.height = t.height ?? 48));
  }
  get nodeSize() {
    let t, n, l;
    return this.nodeProps.shape === ce.CIRCLE ? (l = this.nodeProps.radius, t = 2 * l, n = 2 * l) : (t = this.nodeProps.width, n = this.nodeProps.height, l = t / 2), {
      width: t,
      height: n,
      radius: l
    };
  }
  set nodeProps(t) {
    t.shape = t.shape ?? this._nodeProps.shape, this._nodeProps = t, t.shape === ce.CIRCLE ? this.nodeSize = { radius: t.radius } : t.shape === ce.RECTANGLE && (this.nodeSize = { width: t.width, height: t.height }, t.cornerRadius === void 0 && (this._nodeProps.cornerRadius = 4), t.reflexiveEdgeStart === void 0 && (this._nodeProps.reflexiveEdgeStart = "MOVABLE"));
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
class Jn {
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
  constructor(t, n, l, a, h, c, f, d, m, g, b, _) {
    this.id = t, this.props = n, this.idImported = l, this.x = a, this.y = h, this.label = c, this.color = f, this.deletable = m, this.labelEditable = g, this.allowIncomingLinks = b, this.allowOutgoingLinks = _, this.fixedPosition = d, this._renderedSize = this.getSize();
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
    if (t === ce.CIRCLE) {
      let l = n.nodeProps.radius ?? 0.5 * this.props.width;
      this.props = {
        shape: ce.CIRCLE,
        radius: l
      };
    } else if (t === ce.RECTANGLE) {
      let l = n.nodeProps.width ?? 2 * this.props.radius, a = n.nodeProps.height ?? this.props.radius, h = n.nodeProps.cornerRadius ?? 4, c = n.nodeProps.reflexiveEdgeStart ?? "MOVABLE";
      this.props = {
        shape: ce.RECTANGLE,
        width: l,
        height: a,
        cornerRadius: h,
        reflexiveEdgeStart: c
      };
    }
  }
  setSize(t, n) {
    this.props.shape === ce.CIRCLE ? typeof t == "number" ? this.props.radius = t / 2 : this.props.radius = t.radius ?? n.nodeProps.radius : this.props.shape === ce.RECTANGLE && (typeof t == "number" ? (this.props.width = t, this.props.height = t) : (this.props.width = t.width ?? n.nodeProps.width, this.props.height = t.height ?? n.nodeProps.height));
  }
  /**
   * Returns the node's defined base size.
   *
   * If the node is not allowed to grow to fit its label size, this is identical to the
   * rendered size. Otherwise, the rendered size may be larger, and this value
   * represents the minimal size the node can shrink to.
   */
  getSize() {
    return this.props.shape === ce.CIRCLE ? { radius: this.props.radius } : { width: this.props.width, height: this.props.height };
  }
  /**
   * Sets the nodes rendered size so it is large enough to fit the given size,
   * but at least as large as the minimal size defined in the node properties.
   *
   * @param size - The required size
   */
  set renderedSize(t) {
    if (this.props.shape === ce.CIRCLE) {
      typeof t == "number" && (t = { radius: t / 2 });
      const n = t.radius > this.props.radius ? t.radius : this.props.radius;
      this._renderedSize.radius !== n && (this._renderedSize = { radius: n });
    } else if (this.props.shape === ce.RECTANGLE) {
      typeof t == "number" && (t = { width: t, height: t });
      const n = t.width > this.props.width ? t.width : this.props.width, l = t.height > this.props.height ? t.height : this.props.height;
      (this._renderedSize.width !== n || this._renderedSize.height !== l) && (this._renderedSize = { width: n, height: l });
    }
  }
  get renderedSize() {
    return this._renderedSize;
  }
}
function dh(e, t) {
  const n = new CustomEvent("nodecreated", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function gh(e, t) {
  const n = new CustomEvent("linkcreated", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function ph(e, t, n) {
  const l = new CustomEvent("nodeclicked", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y },
      button: t
    }
  });
  n.node().dispatchEvent(l);
}
function mh(e, t, n) {
  const l = new CustomEvent("linkclicked", {
    detail: {
      link: { id: e.id, label: e.label },
      button: t
    }
  });
  n.node().dispatchEvent(l);
}
function In(e, t) {
  const n = new CustomEvent("nodedeleted", {
    detail: {
      node: { id: e.id, label: e.label, x: e.x, y: e.y }
    }
  });
  t.node().dispatchEvent(n);
}
function zt(e, t) {
  const n = new CustomEvent("linkdeleted", {
    detail: {
      link: { id: e.id, label: e.label }
    }
  });
  t.node().dispatchEvent(n);
}
function wh(e, t, n) {
  const l = new CustomEvent("labeledited", {
    detail: {
      parent: { id: e.id },
      label: t
    }
  });
  n.node().dispatchEvent(l);
}
function yh(e, t, n) {
  const l = new CustomEvent("noderenderedsizechange", {
    detail: {
      node: { id: e.id, renderedSize: e.renderedSize, baseSize: e.getSize() },
      previousRenderedSize: t
    }
  });
  n.node().dispatchEvent(l);
}
function et(e) {
  e.preventDefault(), e.stopPropagation();
}
function vh(e, t, n, l) {
  return vl().filter(
    (a, h) => a.button === 0 && //left mouse click
    (h.fixedPosition?.x !== !0 || h.fixedPosition?.y !== !0)
  ).on("start", (a, h) => {
    et(a.sourceEvent), a.active === 0 && e.alphaTarget(0.5).restart(), h.fixedPosition?.x !== !0 && (h.fx = h.x), h.fixedPosition?.y !== !0 && (h.fy = h.y);
  }).on("drag", (a, h) => {
    h.fixedPosition?.x !== !0 && (l.isCanvasBoundToView ? h.props.shape === ce.CIRCLE ? h.fx = Math.max(
      h.renderedSize.radius,
      Math.min(t - h.renderedSize.radius, a.x)
    ) : h.props.shape === ce.RECTANGLE && (h.fx = Math.max(
      0.5 * h.renderedSize.width,
      Math.min(t - 0.5 * h.renderedSize.width, a.x)
    )) : h.fx = a.x), h.fixedPosition?.y !== !0 && (l.isCanvasBoundToView ? h.props.shape === ce.CIRCLE ? h.fy = Math.max(
      h.renderedSize.radius,
      Math.min(n - h.renderedSize.radius, a.y)
    ) : h.props.shape === ce.RECTANGLE && (h.fy = Math.max(
      0.5 * h.renderedSize.height,
      Math.min(n - 0.5 * h.renderedSize.height, a.y)
    )) : h.fy = a.y);
  }).on("end", (a, h) => {
    a.active === 0 && e.alphaTarget(0), h.fixedPosition?.x !== !0 && (h.fx = void 0), h.fixedPosition?.y !== !0 && (h.fy = void 0);
  });
}
function bh(e, t, n, l, a) {
  return e.append("svg").attr("class", "graph-controller__graph-canvas").style("background-color", "white").on("pointermove", (c) => n(c)).on("pointerup", (c) => l(c)).on("contextmenu", (c) => et(c)).on("dblclick", (c) => a(c)).call(t).on("dblclick.zoom", null).append("g");
}
var tt = /* @__PURE__ */ ((e) => (e.LINE = "LINE", e.LINEREVERSE = "LINE-REVERSE", e.ARC = "ARC", e.ARCREVERSE = "ARC-REVERSE", e.REFLEXIVE = "REFLEXIVE", e))(tt || {});
class _h {
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
function xh(e) {
  return e.append("g").classed("links", !0).selectAll(".graph-controller__link-container");
}
function Eh(e) {
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
function Pn(e, t) {
  t !== void 0 && (typeof t == "boolean" ? t ? e.fixedPosition = { x: !0, y: !0 } : e.fixedPosition = { x: !1, y: !1 } : Mt(["x", "y"], Object.keys(t), !0) && (e.fixedPosition = t, sn(["x", "y"], Object.keys(t))));
}
function Sh(e, t, n) {
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
function dn(e) {
  return e.replace(/([#.,;:<>+~^$|[\]()%\\ ])/g, "\\$1");
}
function fi(e) {
  let t = e.target;
  t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId);
}
function kh(e, t, n = 2) {
  const l = Math.abs(e.x - t.x), a = Math.abs(e.y - t.y);
  return l < n && a < n;
}
function sn(e, t, n) {
  let l = !0;
  return t.forEach((a) => {
    e.includes(
      a
      // we actually just check if the type is keyof
    ) || (l = !1, qt(
      `Option not valid: ${a}`,
      `Use the following: ${e.join(", ")}.`
    ));
  }), l;
}
function Mt(e, t, n) {
  let l = !0, a = e.filter((h) => !t.includes(h));
  return a.length > 0 && (l = !1, n && qt("Option missing", `Add: ${a}`)), l;
}
function qt(e, t) {
  console.error(e + `
` + t);
}
function Mh(e, t, n, l) {
  if (on(e, n, t + "-link-arrow", "graph-controller__arrow", !1), on(
    e,
    n,
    t + "-link-arrow-reverse",
    "graph-controller__arrow",
    !0
  ), on(
    e,
    n,
    t + "-draggable-link-arrow",
    "graph-controller__arrow draggable",
    !1
  ), l)
    for (let a of l)
      Mr(e, t, n, a);
}
function Mr(e, t, n, l) {
  e.select(`#${t}-link-arrow-` + dn(l)).empty() && (on(
    e,
    n,
    t + "-link-arrow-" + l,
    "graph-controller__arrow " + l,
    !1,
    l
  ), on(
    e,
    n,
    t + "-link-arrow-reverse-" + l,
    "graph-controller__arrow colored",
    !0,
    l
  ));
}
function dr(e, t, n) {
  e.select(`#${t}-link-arrow-` + dn(n)).select(function() {
    return this.parentNode;
  }).remove(), e.select(`#${t}-link-arrow-reverse-` + dn(n)).select(function() {
    return this.parentNode;
  }).remove();
}
function on(e, t, n, l, a, h) {
  e.append("defs").append("marker").attr("id", n).attr("viewBox", t.markerPath).attr("refX", t.markerRef).attr("refY", t.markerRef).attr("markerWidth", t.markerBoxSize).attr("markerHeight", t.markerBoxSize).attr("orient", a ? "auto-start-reverse" : "auto").classed(l, !0).append("path").attr("d", `${nh()(t.arrowPoints)}`).style("fill", h || "");
}
function Nh(e) {
  return e.append("path").classed("graph-controller__link draggable hidden", !0).attr("d", "M0,0L0,0");
}
class di {
  nodeIdCounter = 0;
  nodes = [];
  links = [];
  createNode(t, n, l, a, h, c, f, d, m, g, b) {
    const _ = new Jn(
      this.nodeIdCounter++,
      t,
      a,
      n,
      l,
      h,
      c,
      f,
      d,
      m,
      g,
      b
    );
    return this.nodes.push(_), _;
  }
  createLink(t, n, l, a, h, c) {
    if (this.links.find(
      (b) => b.source.id === t && b.target.id === n
    ) !== void 0)
      return;
    const d = this.nodes.find((b) => b.id === t);
    if (d === void 0)
      return;
    const m = this.nodes.find((b) => b.id === n);
    if (m === void 0)
      return;
    const g = new _h(
      d,
      m,
      void 0,
      l,
      a,
      h,
      c
    );
    return this.links.push(g), g;
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
      let d = `${f.id}`;
      return t && f.label !== void 0 && (d += ` ${f.label}`), l && f.color !== void 0 && (d += ` /COLOR:/${f.color}`), d;
    }).join(`
`), c = this.links.map((f) => {
      let d = `${f.source.id} ${f.target.id}`;
      return n && f.label !== void 0 && (d += ` ${f.label}`), a && f.color !== void 0 && (d += ` /COLOR:/${f.color}`), d;
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
  toJSON(t = !0, n = !0, l = !0, a = !0, h = !0, c = !0, f = !0, d = !0) {
    let m = this.nodes.map((b) => Object.fromEntries(
      Object.entries(b).filter(([_]) => _ === "id" || t && (_ === "x" || _ === "y") || n && _ === "label" || a && _ === "props" || h && _ === "color" || f && [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ].includes(_))
    )), g = this.links.map((b) => Object.fromEntries(
      Object.entries(this._convertToJSONLink(b)).filter(([_]) => _ === "sourceId" || _ === "targetId" || l && _ === "label" || c && _ === "color" || d && ["deletable", "labelEditable"].includes(_))
    ));
    return JSON.stringify({ nodes: m, links: g }, null, 4);
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
function Lh(e) {
  var t = +this._x.call(null, e), n = +this._y.call(null, e);
  return es(this.cover(t, n), t, n, e);
}
function es(e, t, n, l) {
  if (isNaN(t) || isNaN(n)) return e;
  var a, h = e._root, c = { data: l }, f = e._x0, d = e._y0, m = e._x1, g = e._y1, b, _, R, z, F, $, k, B;
  if (!h) return e._root = c, e;
  for (; h.length; )
    if ((F = t >= (b = (f + m) / 2)) ? f = b : m = b, ($ = n >= (_ = (d + g) / 2)) ? d = _ : g = _, a = h, !(h = h[k = $ << 1 | F])) return a[k] = c, e;
  if (R = +e._x.call(null, h.data), z = +e._y.call(null, h.data), t === R && n === z) return c.next = h, a ? a[k] = c : e._root = c, e;
  do
    a = a ? a[k] = new Array(4) : e._root = new Array(4), (F = t >= (b = (f + m) / 2)) ? f = b : m = b, ($ = n >= (_ = (d + g) / 2)) ? d = _ : g = _;
  while ((k = $ << 1 | F) === (B = (z >= _) << 1 | R >= b));
  return a[B] = h, a[k] = c, e;
}
function Th(e) {
  var t, n, l = e.length, a, h, c = new Array(l), f = new Array(l), d = 1 / 0, m = 1 / 0, g = -1 / 0, b = -1 / 0;
  for (n = 0; n < l; ++n)
    isNaN(a = +this._x.call(null, t = e[n])) || isNaN(h = +this._y.call(null, t)) || (c[n] = a, f[n] = h, a < d && (d = a), a > g && (g = a), h < m && (m = h), h > b && (b = h));
  for (g < d && (d = this._x0, g = this._x1), b < m && (m = this._y0, b = this._y1), this.cover(d, m).cover(g, b), n = 0; n < l; ++n)
    es(this, c[n], f[n], e[n]);
  return this;
}
function Rh(e, t) {
  if (isNaN(e = +e) || isNaN(t = +t)) return this;
  var n = this._x0, l = this._y0, a = this._x1, h = this._y1;
  if (isNaN(n))
    a = (n = Math.floor(e)) + 1, h = (l = Math.floor(t)) + 1;
  else if (n > e || e > a || l > t || t > h) {
    var c = a - n, f = this._root, d, m;
    switch (m = (t < (l + h) / 2) << 1 | e < (n + a) / 2) {
      case 0: {
        do
          d = new Array(4), d[m] = f, f = d;
        while (c *= 2, a = n + c, h = l + c, e > a || t > h);
        break;
      }
      case 1: {
        do
          d = new Array(4), d[m] = f, f = d;
        while (c *= 2, n = a - c, h = l + c, n > e || t > h);
        break;
      }
      case 2: {
        do
          d = new Array(4), d[m] = f, f = d;
        while (c *= 2, a = n + c, l = h - c, e > a || l > t);
        break;
      }
      case 3: {
        do
          d = new Array(4), d[m] = f, f = d;
        while (c *= 2, n = a - c, l = h - c, n > e || l > t);
        break;
      }
    }
    this._root && this._root.length && (this._root = f);
  } else return this;
  return this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this;
}
function Ch() {
  var e = [];
  return this.visit(function(t) {
    if (!t.length) do
      e.push(t.data);
    while (t = t.next);
  }), e;
}
function Ih(e) {
  return arguments.length ? this.cover(+e[0][0], +e[0][1]).cover(+e[1][0], +e[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Ue(e, t, n, l, a) {
  this.node = e, this.x0 = t, this.y0 = n, this.x1 = l, this.y1 = a;
}
function Ph(e, t, n) {
  var l, a = this._x0, h = this._y0, c, f, d, m, g = this._x1, b = this._y1, _ = [], R = this._root, z, F;
  for (R && _.push(new Ue(R, a, h, g, b)), n == null ? n = 1 / 0 : (a = e - n, h = t - n, g = e + n, b = t + n, n *= n); z = _.pop(); )
    if (!(!(R = z.node) || (c = z.x0) > g || (f = z.y0) > b || (d = z.x1) < a || (m = z.y1) < h))
      if (R.length) {
        var $ = (c + d) / 2, k = (f + m) / 2;
        _.push(
          new Ue(R[3], $, k, d, m),
          new Ue(R[2], c, k, $, m),
          new Ue(R[1], $, f, d, k),
          new Ue(R[0], c, f, $, k)
        ), (F = (t >= k) << 1 | e >= $) && (z = _[_.length - 1], _[_.length - 1] = _[_.length - 1 - F], _[_.length - 1 - F] = z);
      } else {
        var B = e - +this._x.call(null, R.data), Z = t - +this._y.call(null, R.data), P = B * B + Z * Z;
        if (P < n) {
          var D = Math.sqrt(n = P);
          a = e - D, h = t - D, g = e + D, b = t + D, l = R.data;
        }
      }
  return l;
}
function zh(e) {
  if (isNaN(g = +this._x.call(null, e)) || isNaN(b = +this._y.call(null, e))) return this;
  var t, n = this._root, l, a, h, c = this._x0, f = this._y0, d = this._x1, m = this._y1, g, b, _, R, z, F, $, k;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((z = g >= (_ = (c + d) / 2)) ? c = _ : d = _, (F = b >= (R = (f + m) / 2)) ? f = R : m = R, t = n, !(n = n[$ = F << 1 | z])) return this;
    if (!n.length) break;
    (t[$ + 1 & 3] || t[$ + 2 & 3] || t[$ + 3 & 3]) && (l = t, k = $);
  }
  for (; n.data !== e; ) if (a = n, !(n = n.next)) return this;
  return (h = n.next) && delete n.next, a ? (h ? a.next = h : delete a.next, this) : t ? (h ? t[$] = h : delete t[$], (n = t[0] || t[1] || t[2] || t[3]) && n === (t[3] || t[2] || t[1] || t[0]) && !n.length && (l ? l[k] = n : this._root = n), this) : (this._root = h, this);
}
function $h(e) {
  for (var t = 0, n = e.length; t < n; ++t) this.remove(e[t]);
  return this;
}
function Oh() {
  return this._root;
}
function Ah() {
  var e = 0;
  return this.visit(function(t) {
    if (!t.length) do
      ++e;
    while (t = t.next);
  }), e;
}
function Fh(e) {
  var t = [], n, l = this._root, a, h, c, f, d;
  for (l && t.push(new Ue(l, this._x0, this._y0, this._x1, this._y1)); n = t.pop(); )
    if (!e(l = n.node, h = n.x0, c = n.y0, f = n.x1, d = n.y1) && l.length) {
      var m = (h + f) / 2, g = (c + d) / 2;
      (a = l[3]) && t.push(new Ue(a, m, g, f, d)), (a = l[2]) && t.push(new Ue(a, h, g, m, d)), (a = l[1]) && t.push(new Ue(a, m, c, f, g)), (a = l[0]) && t.push(new Ue(a, h, c, m, g));
    }
  return this;
}
function Bh(e) {
  var t = [], n = [], l;
  for (this._root && t.push(new Ue(this._root, this._x0, this._y0, this._x1, this._y1)); l = t.pop(); ) {
    var a = l.node;
    if (a.length) {
      var h, c = l.x0, f = l.y0, d = l.x1, m = l.y1, g = (c + d) / 2, b = (f + m) / 2;
      (h = a[0]) && t.push(new Ue(h, c, f, g, b)), (h = a[1]) && t.push(new Ue(h, g, f, d, b)), (h = a[2]) && t.push(new Ue(h, c, b, g, m)), (h = a[3]) && t.push(new Ue(h, g, b, d, m));
    }
    n.push(l);
  }
  for (; l = n.pop(); )
    e(l.node, l.x0, l.y0, l.x1, l.y1);
  return this;
}
function jh(e) {
  return e[0];
}
function Dh(e) {
  return arguments.length ? (this._x = e, this) : this._x;
}
function Gh(e) {
  return e[1];
}
function Vh(e) {
  return arguments.length ? (this._y = e, this) : this._y;
}
function ts(e, t, n) {
  var l = new Br(t ?? jh, n ?? Gh, NaN, NaN, NaN, NaN);
  return e == null ? l : l.addAll(e);
}
function Br(e, t, n, l, a, h) {
  this._x = e, this._y = t, this._x0 = n, this._y0 = l, this._x1 = a, this._y1 = h, this._root = void 0;
}
function gi(e) {
  for (var t = { data: e.data }, n = t; e = e.next; ) n = n.next = { data: e.data };
  return t;
}
var Qe = ts.prototype = Br.prototype;
Qe.copy = function() {
  var e = new Br(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, n, l;
  if (!t) return e;
  if (!t.length) return e._root = gi(t), e;
  for (n = [{ source: t, target: e._root = new Array(4) }]; t = n.pop(); )
    for (var a = 0; a < 4; ++a)
      (l = t.source[a]) && (l.length ? n.push({ source: l, target: t.target[a] = new Array(4) }) : t.target[a] = gi(l));
  return e;
};
Qe.add = Lh;
Qe.addAll = Th;
Qe.cover = Rh;
Qe.data = Ch;
Qe.extent = Ih;
Qe.find = Ph;
Qe.remove = zh;
Qe.removeAll = $h;
Qe.root = Oh;
Qe.size = Ah;
Qe.visit = Fh;
Qe.visitAfter = Bh;
Qe.x = Dh;
Qe.y = Vh;
function qh(e) {
  function t(b) {
    return b.x + b.vx;
  }
  function n(b) {
    return b.y + b.vy;
  }
  function l(b) {
    return function() {
      return b;
    };
  }
  var a, h, c = 1, f = 1;
  typeof e != "function" && (e = l(e === null ? [[0, 0][1]] : e));
  function d() {
    var b, _, R, z, F, $, k, B, Z, P, D = [];
    a.forEach(function(re, de) {
      D.push({ node: re, vx: re.vx, vy: re.vy, x: re.x + (h[de][1][0] + h[de][0][0]) / 2, y: re.y + (h[de][0][1] + h[de][1][1]) / 2 }), D.push({ node: re, vx: re.vx, vy: re.vy, x: re.x + h[de][0][0], y: re.y + h[de][0][1] }), D.push({ node: re, vx: re.vx, vy: re.vy, x: re.x + h[de][0][0], y: re.y + h[de][1][1] }), D.push({ node: re, vx: re.vx, vy: re.vy, x: re.x + h[de][1][0], y: re.y + h[de][0][1] }), D.push({ node: re, vx: re.vx, vy: re.vy, x: re.x + h[de][1][0], y: re.y + h[de][1][1] });
    });
    for (var te = D.length, ne = 0; ne < f; ++ne)
      for (_ = ts(D, t, n).visitAfter(m), b = 0; b < te; ++b) {
        var he = ~~(b / 5);
        R = a[he], $ = h[he], z = R.x + R.vx, F = R.y + R.vy, k = z + $[0][0], B = F + $[0][1], Z = z + $[1][0], P = F + $[1][1], _.visit(ge);
      }
    function ge(re, de, ye, ae, A) {
      var ee = re.data;
      if (ee) {
        var W = g($, 0), oe = g($, 1);
        if (ee.node.index !== he) {
          var ue = ee.node, fe = h[ue.index], pe = ue.x + ue.vx + fe[0][0], me = ue.y + ue.vy + fe[0][1], ie = ue.x + ue.vx + fe[1][0], Re = ue.y + ue.vy + fe[1][1], Se = g(fe, 0), Q = g(fe, 1);
          if (k <= ie && pe <= Z && B <= Re && me <= P) {
            var Me = [Math.min.apply(null, [pe, ie, k, Z]), Math.max.apply(null, [pe, ie, k, Z])], Le = [Math.min.apply(null, [me, Re, B, P]), Math.max.apply(null, [me, Re, B, P])], xe = W + Se - (Me[1] - Me[0]), Oe = oe + Q - (Le[1] - Le[0]), ct = xe * c * (Oe / oe), ft = Oe * c * (xe / W), Tt = xe * c * (Oe / Q), Rt = Oe * c * (xe / Se);
            (k + Z) / 2 < (pe + ie) / 2 ? (R.vx -= ct, ue.vx += Tt) : (R.vx += ct, ue.vx -= Tt), (B + P) / 2 < (me + Re) / 2 ? (R.vy -= ft, ue.vy += Rt) : (R.vy += ft, ue.vy -= Rt);
          }
        }
        return;
      }
      return de > Z || ae < k || ye > P || A < B;
    }
  }
  function m(b) {
    if (b.data)
      return b.bb = h[b.data.node.index];
    b.bb = [[0, 0], [0, 0]];
    for (var _ = 0; _ < 4; ++_)
      b[_] && b[_].bb[0][0] < b.bb[0][0] && (b.bb[0][0] = b[_].bb[0][0]), b[_] && b[_].bb[0][1] < b.bb[0][1] && (b.bb[0][1] = b[_].bb[0][1]), b[_] && b[_].bb[1][0] > b.bb[1][0] && (b.bb[1][0] = b[_].bb[1][0]), b[_] && b[_].bb[1][1] > b.bb[1][1] && (b.bb[1][1] = b[_].bb[1][1]);
  }
  function g(b, _) {
    return b[1][_] - b[0][_];
  }
  return d.initialize = function(b) {
    var _, R = (a = b).length;
    for (h = new Array(R), _ = 0; _ < R; ++_) h[_] = e(a[_], _, a);
  }, d.iterations = function(b) {
    return arguments.length ? (f = +b, d) : f;
  }, d.strength = function(b) {
    return arguments.length ? (c = +b, d) : c;
  }, d.bbox = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : l(+b), d) : e;
  }, d;
}
function Uh(e, t, n, l, a) {
  let h = Fu(e.nodes).on("tick", () => a());
  return h = jn(h, e, t), t.isCanvasBoundToView && (h = Wh(h, e, n, l)), h = rs(h, e, t, t.fixedLinkDistanceEnabled), h = ns(h, t.nodePhysicsEnabled, n, l), h;
}
function jn(e, t, n) {
  return (!t.nodes || t.nodes.length === 0 ? n.nodeProps.shape === ce.CIRCLE : t.nodes.every((a) => a.props.shape === ce.CIRCLE)) ? e.force(
    "collideCircle",
    Lu().radius((a) => a.renderedSize.radius)
  ).force("collideBox", null) : e.force(
    "collideBox",
    qh((a) => {
      if (a.props.shape === ce.CIRCLE)
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
      if (a.props.shape === ce.RECTANGLE)
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
function Wh(e, t, n, l) {
  return e.force("bounds", () => {
    for (const a of t.nodes)
      a.props.shape === ce.CIRCLE ? (a.x = Math.max(
        a.renderedSize.radius,
        Math.min(n - a.renderedSize.radius, a.x)
      ), a.y = Math.max(
        a.renderedSize.radius,
        Math.min(l - a.renderedSize.radius, a.y)
      )) : a.props.shape === ce.RECTANGLE && (a.x = Math.max(
        0.5 * a.renderedSize.width,
        Math.min(n - 0.5 * a.renderedSize.width, a.x)
      ), a.y = Math.max(
        0.5 * a.renderedSize.height,
        Math.min(l - 0.5 * a.renderedSize.height, a.y)
      ));
  });
}
function ns(e, t, n, l) {
  return t ? e.force("charge", Bu().strength(-500)).force("x", ju(n / 2).strength(0.05)).force("y", Du(l / 2).strength(0.05)) : e.force("charge", null).force("x", null).force("y", null);
}
function rs(e, t, n, l) {
  if (l) {
    let a = 0;
    return n.nodeProps.shape === ce.CIRCLE ? a = n.nodeProps.radius : n.nodeProps.shape === ce.RECTANGLE && (n.nodeProps.width < n.nodeProps.height ? a = n.nodeProps.width / 2 : a = n.nodeProps.height / 2), e.force(
      "link",
      Ru().links(t.links).id((h) => h.id).distance(a * 10)
    );
  } else
    return e.force("link", null);
}
function is(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ss(e) {
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
var we = {};
const Xh = Object.prototype.toString;
function gn(e) {
  const t = Xh.call(e);
  return t.endsWith("Array]") && !t.includes("Big");
}
const Qh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAnyArray: gn
}, Symbol.toStringTag, { value: "Module" })), Yh = /* @__PURE__ */ ss(Qh);
function Jh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!gn(e))
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
function Zh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!gn(e))
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
function Kh(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (gn(e)) {
    if (e.length === 0)
      throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var n;
  if (t.output !== void 0) {
    if (!gn(t.output))
      throw new TypeError("output option must be an array if specified");
    n = t.output;
  } else
    n = new Array(e.length);
  var l = Zh(e), a = Jh(e);
  if (l === a)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var h = t.min, c = h === void 0 ? t.autoMinMax ? l : 0 : h, f = t.max, d = f === void 0 ? t.autoMinMax ? a : 1 : f;
  if (c >= d)
    throw new RangeError("min option must be smaller than max option");
  for (var m = (d - c) / (a - l), g = 0; g < e.length; g++)
    n[g] = (e[g] - l) * m + c;
  return n;
}
const Hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kh
}, Symbol.toStringTag, { value: "Module" })), ec = /* @__PURE__ */ ss(Hh);
var pi;
function tc() {
  if (pi) return we;
  pi = 1, Object.defineProperty(we, "__esModule", { value: !0 });
  var e = Yh, t = ec;
  const n = " ".repeat(2), l = " ".repeat(4);
  function a() {
    return h(this);
  }
  function h(p, i = {}) {
    const {
      maxRows: s = 15,
      maxColumns: r = 10,
      maxNumSize: o = 8,
      padMinus: u = "auto"
    } = i;
    return `${p.constructor.name} {
${n}[
${l}${c(p, s, r, o, u)}
${n}]
${n}rows: ${p.rows}
${n}columns: ${p.columns}
}`;
  }
  function c(p, i, s, r, o) {
    const { rows: u, columns: v } = p, y = Math.min(u, i), S = Math.min(v, s), E = [];
    if (o === "auto") {
      o = !1;
      e: for (let O = 0; O < y; O++)
        for (let T = 0; T < S; T++)
          if (p.get(O, T) < 0) {
            o = !0;
            break e;
          }
    }
    for (let O = 0; O < y; O++) {
      let T = [];
      for (let G = 0; G < S; G++)
        T.push(f(p.get(O, G), r, o));
      E.push(`${T.join(" ")}`);
    }
    return S !== v && (E[E.length - 1] += ` ... ${v - s} more columns`), y !== u && E.push(`... ${u - i} more rows`), E.join(`
${l}`);
  }
  function f(p, i, s) {
    return (p >= 0 && s ? ` ${d(p, i - 1)}` : d(p, i)).padEnd(i);
  }
  function d(p, i) {
    let s = p.toString();
    if (s.length <= i) return s;
    let r = p.toFixed(i);
    if (r.length > i && (r = p.toFixed(Math.max(0, i - (r.length - i)))), r.length <= i && !r.startsWith("0.000") && !r.startsWith("-0.000"))
      return r;
    let o = p.toExponential(i);
    return o.length > i && (o = p.toExponential(Math.max(0, i - (o.length - i)))), o.slice(0);
  }
  function m(p, i) {
    p.prototype.add = function(r) {
      return typeof r == "number" ? this.addS(r) : this.addM(r);
    }, p.prototype.addS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) + r);
      return this;
    }, p.prototype.addM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) + r.get(o, u));
      return this;
    }, p.add = function(r, o) {
      return new i(r).add(o);
    }, p.prototype.sub = function(r) {
      return typeof r == "number" ? this.subS(r) : this.subM(r);
    }, p.prototype.subS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) - r);
      return this;
    }, p.prototype.subM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) - r.get(o, u));
      return this;
    }, p.sub = function(r, o) {
      return new i(r).sub(o);
    }, p.prototype.subtract = p.prototype.sub, p.prototype.subtractS = p.prototype.subS, p.prototype.subtractM = p.prototype.subM, p.subtract = p.sub, p.prototype.mul = function(r) {
      return typeof r == "number" ? this.mulS(r) : this.mulM(r);
    }, p.prototype.mulS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) * r);
      return this;
    }, p.prototype.mulM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) * r.get(o, u));
      return this;
    }, p.mul = function(r, o) {
      return new i(r).mul(o);
    }, p.prototype.multiply = p.prototype.mul, p.prototype.multiplyS = p.prototype.mulS, p.prototype.multiplyM = p.prototype.mulM, p.multiply = p.mul, p.prototype.div = function(r) {
      return typeof r == "number" ? this.divS(r) : this.divM(r);
    }, p.prototype.divS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) / r);
      return this;
    }, p.prototype.divM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) / r.get(o, u));
      return this;
    }, p.div = function(r, o) {
      return new i(r).div(o);
    }, p.prototype.divide = p.prototype.div, p.prototype.divideS = p.prototype.divS, p.prototype.divideM = p.prototype.divM, p.divide = p.div, p.prototype.mod = function(r) {
      return typeof r == "number" ? this.modS(r) : this.modM(r);
    }, p.prototype.modS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) % r);
      return this;
    }, p.prototype.modM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) % r.get(o, u));
      return this;
    }, p.mod = function(r, o) {
      return new i(r).mod(o);
    }, p.prototype.modulus = p.prototype.mod, p.prototype.modulusS = p.prototype.modS, p.prototype.modulusM = p.prototype.modM, p.modulus = p.mod, p.prototype.and = function(r) {
      return typeof r == "number" ? this.andS(r) : this.andM(r);
    }, p.prototype.andS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) & r);
      return this;
    }, p.prototype.andM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) & r.get(o, u));
      return this;
    }, p.and = function(r, o) {
      return new i(r).and(o);
    }, p.prototype.or = function(r) {
      return typeof r == "number" ? this.orS(r) : this.orM(r);
    }, p.prototype.orS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) | r);
      return this;
    }, p.prototype.orM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) | r.get(o, u));
      return this;
    }, p.or = function(r, o) {
      return new i(r).or(o);
    }, p.prototype.xor = function(r) {
      return typeof r == "number" ? this.xorS(r) : this.xorM(r);
    }, p.prototype.xorS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ^ r);
      return this;
    }, p.prototype.xorM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ^ r.get(o, u));
      return this;
    }, p.xor = function(r, o) {
      return new i(r).xor(o);
    }, p.prototype.leftShift = function(r) {
      return typeof r == "number" ? this.leftShiftS(r) : this.leftShiftM(r);
    }, p.prototype.leftShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) << r);
      return this;
    }, p.prototype.leftShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) << r.get(o, u));
      return this;
    }, p.leftShift = function(r, o) {
      return new i(r).leftShift(o);
    }, p.prototype.signPropagatingRightShift = function(r) {
      return typeof r == "number" ? this.signPropagatingRightShiftS(r) : this.signPropagatingRightShiftM(r);
    }, p.prototype.signPropagatingRightShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >> r);
      return this;
    }, p.prototype.signPropagatingRightShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >> r.get(o, u));
      return this;
    }, p.signPropagatingRightShift = function(r, o) {
      return new i(r).signPropagatingRightShift(o);
    }, p.prototype.rightShift = function(r) {
      return typeof r == "number" ? this.rightShiftS(r) : this.rightShiftM(r);
    }, p.prototype.rightShiftS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >>> r);
      return this;
    }, p.prototype.rightShiftM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) >>> r.get(o, u));
      return this;
    }, p.rightShift = function(r, o) {
      return new i(r).rightShift(o);
    }, p.prototype.zeroFillRightShift = p.prototype.rightShift, p.prototype.zeroFillRightShiftS = p.prototype.rightShiftS, p.prototype.zeroFillRightShiftM = p.prototype.rightShiftM, p.zeroFillRightShift = p.rightShift, p.prototype.not = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, ~this.get(r, o));
      return this;
    }, p.not = function(r) {
      return new i(r).not();
    }, p.prototype.abs = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.abs(this.get(r, o)));
      return this;
    }, p.abs = function(r) {
      return new i(r).abs();
    }, p.prototype.acos = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.acos(this.get(r, o)));
      return this;
    }, p.acos = function(r) {
      return new i(r).acos();
    }, p.prototype.acosh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.acosh(this.get(r, o)));
      return this;
    }, p.acosh = function(r) {
      return new i(r).acosh();
    }, p.prototype.asin = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.asin(this.get(r, o)));
      return this;
    }, p.asin = function(r) {
      return new i(r).asin();
    }, p.prototype.asinh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.asinh(this.get(r, o)));
      return this;
    }, p.asinh = function(r) {
      return new i(r).asinh();
    }, p.prototype.atan = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.atan(this.get(r, o)));
      return this;
    }, p.atan = function(r) {
      return new i(r).atan();
    }, p.prototype.atanh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.atanh(this.get(r, o)));
      return this;
    }, p.atanh = function(r) {
      return new i(r).atanh();
    }, p.prototype.cbrt = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cbrt(this.get(r, o)));
      return this;
    }, p.cbrt = function(r) {
      return new i(r).cbrt();
    }, p.prototype.ceil = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.ceil(this.get(r, o)));
      return this;
    }, p.ceil = function(r) {
      return new i(r).ceil();
    }, p.prototype.clz32 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.clz32(this.get(r, o)));
      return this;
    }, p.clz32 = function(r) {
      return new i(r).clz32();
    }, p.prototype.cos = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cos(this.get(r, o)));
      return this;
    }, p.cos = function(r) {
      return new i(r).cos();
    }, p.prototype.cosh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.cosh(this.get(r, o)));
      return this;
    }, p.cosh = function(r) {
      return new i(r).cosh();
    }, p.prototype.exp = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.exp(this.get(r, o)));
      return this;
    }, p.exp = function(r) {
      return new i(r).exp();
    }, p.prototype.expm1 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.expm1(this.get(r, o)));
      return this;
    }, p.expm1 = function(r) {
      return new i(r).expm1();
    }, p.prototype.floor = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.floor(this.get(r, o)));
      return this;
    }, p.floor = function(r) {
      return new i(r).floor();
    }, p.prototype.fround = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.fround(this.get(r, o)));
      return this;
    }, p.fround = function(r) {
      return new i(r).fround();
    }, p.prototype.log = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log(this.get(r, o)));
      return this;
    }, p.log = function(r) {
      return new i(r).log();
    }, p.prototype.log1p = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log1p(this.get(r, o)));
      return this;
    }, p.log1p = function(r) {
      return new i(r).log1p();
    }, p.prototype.log10 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log10(this.get(r, o)));
      return this;
    }, p.log10 = function(r) {
      return new i(r).log10();
    }, p.prototype.log2 = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.log2(this.get(r, o)));
      return this;
    }, p.log2 = function(r) {
      return new i(r).log2();
    }, p.prototype.round = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.round(this.get(r, o)));
      return this;
    }, p.round = function(r) {
      return new i(r).round();
    }, p.prototype.sign = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sign(this.get(r, o)));
      return this;
    }, p.sign = function(r) {
      return new i(r).sign();
    }, p.prototype.sin = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sin(this.get(r, o)));
      return this;
    }, p.sin = function(r) {
      return new i(r).sin();
    }, p.prototype.sinh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sinh(this.get(r, o)));
      return this;
    }, p.sinh = function(r) {
      return new i(r).sinh();
    }, p.prototype.sqrt = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.sqrt(this.get(r, o)));
      return this;
    }, p.sqrt = function(r) {
      return new i(r).sqrt();
    }, p.prototype.tan = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.tan(this.get(r, o)));
      return this;
    }, p.tan = function(r) {
      return new i(r).tan();
    }, p.prototype.tanh = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.tanh(this.get(r, o)));
      return this;
    }, p.tanh = function(r) {
      return new i(r).tanh();
    }, p.prototype.trunc = function() {
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.set(r, o, Math.trunc(this.get(r, o)));
      return this;
    }, p.trunc = function(r) {
      return new i(r).trunc();
    }, p.pow = function(r, o) {
      return new i(r).pow(o);
    }, p.prototype.pow = function(r) {
      return typeof r == "number" ? this.powS(r) : this.powM(r);
    }, p.prototype.powS = function(r) {
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ** r);
      return this;
    }, p.prototype.powM = function(r) {
      if (r = i.checkMatrix(r), this.rows !== r.rows || this.columns !== r.columns)
        throw new RangeError("Matrices dimensions must be equal");
      for (let o = 0; o < this.rows; o++)
        for (let u = 0; u < this.columns; u++)
          this.set(o, u, this.get(o, u) ** r.get(o, u));
      return this;
    };
  }
  function g(p, i, s) {
    let r = s ? p.rows : p.rows - 1;
    if (i < 0 || i > r)
      throw new RangeError("Row index out of range");
  }
  function b(p, i, s) {
    let r = s ? p.columns : p.columns - 1;
    if (i < 0 || i > r)
      throw new RangeError("Column index out of range");
  }
  function _(p, i) {
    if (i.to1DArray && (i = i.to1DArray()), i.length !== p.columns)
      throw new RangeError(
        "vector size must be the same as the number of columns"
      );
    return i;
  }
  function R(p, i) {
    if (i.to1DArray && (i = i.to1DArray()), i.length !== p.rows)
      throw new RangeError("vector size must be the same as the number of rows");
    return i;
  }
  function z(p, i) {
    if (!e.isAnyArray(i))
      throw new TypeError("row indices must be an array");
    for (let s = 0; s < i.length; s++)
      if (i[s] < 0 || i[s] >= p.rows)
        throw new RangeError("row indices are out of range");
  }
  function F(p, i) {
    if (!e.isAnyArray(i))
      throw new TypeError("column indices must be an array");
    for (let s = 0; s < i.length; s++)
      if (i[s] < 0 || i[s] >= p.columns)
        throw new RangeError("column indices are out of range");
  }
  function $(p, i, s, r, o) {
    if (arguments.length !== 5)
      throw new RangeError("expected 4 arguments");
    if (B("startRow", i), B("endRow", s), B("startColumn", r), B("endColumn", o), i > s || r > o || i < 0 || i >= p.rows || s < 0 || s >= p.rows || r < 0 || r >= p.columns || o < 0 || o >= p.columns)
      throw new RangeError("Submatrix indices are out of range");
  }
  function k(p, i = 0) {
    let s = [];
    for (let r = 0; r < p; r++)
      s.push(i);
    return s;
  }
  function B(p, i) {
    if (typeof i != "number")
      throw new TypeError(`${p} must be a number`);
  }
  function Z(p) {
    if (p.isEmpty())
      throw new Error("Empty matrix has no elements to index");
  }
  function P(p) {
    let i = k(p.rows);
    for (let s = 0; s < p.rows; ++s)
      for (let r = 0; r < p.columns; ++r)
        i[s] += p.get(s, r);
    return i;
  }
  function D(p) {
    let i = k(p.columns);
    for (let s = 0; s < p.rows; ++s)
      for (let r = 0; r < p.columns; ++r)
        i[r] += p.get(s, r);
    return i;
  }
  function te(p) {
    let i = 0;
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        i += p.get(s, r);
    return i;
  }
  function ne(p) {
    let i = k(p.rows, 1);
    for (let s = 0; s < p.rows; ++s)
      for (let r = 0; r < p.columns; ++r)
        i[s] *= p.get(s, r);
    return i;
  }
  function he(p) {
    let i = k(p.columns, 1);
    for (let s = 0; s < p.rows; ++s)
      for (let r = 0; r < p.columns; ++r)
        i[r] *= p.get(s, r);
    return i;
  }
  function ge(p) {
    let i = 1;
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        i *= p.get(s, r);
    return i;
  }
  function re(p, i, s) {
    const r = p.rows, o = p.columns, u = [];
    for (let v = 0; v < r; v++) {
      let y = 0, S = 0, E = 0;
      for (let O = 0; O < o; O++)
        E = p.get(v, O) - s[v], y += E, S += E * E;
      i ? u.push((S - y * y / o) / (o - 1)) : u.push((S - y * y / o) / o);
    }
    return u;
  }
  function de(p, i, s) {
    const r = p.rows, o = p.columns, u = [];
    for (let v = 0; v < o; v++) {
      let y = 0, S = 0, E = 0;
      for (let O = 0; O < r; O++)
        E = p.get(O, v) - s[v], y += E, S += E * E;
      i ? u.push((S - y * y / r) / (r - 1)) : u.push((S - y * y / r) / r);
    }
    return u;
  }
  function ye(p, i, s) {
    const r = p.rows, o = p.columns, u = r * o;
    let v = 0, y = 0, S = 0;
    for (let E = 0; E < r; E++)
      for (let O = 0; O < o; O++)
        S = p.get(E, O) - s, v += S, y += S * S;
    return i ? (y - v * v / u) / (u - 1) : (y - v * v / u) / u;
  }
  function ae(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) - i[s]);
  }
  function A(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) - i[r]);
  }
  function ee(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) - i);
  }
  function W(p) {
    const i = [];
    for (let s = 0; s < p.rows; s++) {
      let r = 0;
      for (let o = 0; o < p.columns; o++)
        r += p.get(s, o) ** 2 / (p.columns - 1);
      i.push(Math.sqrt(r));
    }
    return i;
  }
  function oe(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) / i[s]);
  }
  function ue(p) {
    const i = [];
    for (let s = 0; s < p.columns; s++) {
      let r = 0;
      for (let o = 0; o < p.rows; o++)
        r += p.get(o, s) ** 2 / (p.rows - 1);
      i.push(Math.sqrt(r));
    }
    return i;
  }
  function fe(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) / i[r]);
  }
  function pe(p) {
    const i = p.size - 1;
    let s = 0;
    for (let r = 0; r < p.columns; r++)
      for (let o = 0; o < p.rows; o++)
        s += p.get(o, r) ** 2 / i;
    return Math.sqrt(s);
  }
  function me(p, i) {
    for (let s = 0; s < p.rows; s++)
      for (let r = 0; r < p.columns; r++)
        p.set(s, r, p.get(s, r) / i);
  }
  class ie {
    static from1DArray(i, s, r) {
      if (i * s !== r.length)
        throw new RangeError("data length does not match given dimensions");
      let u = new Q(i, s);
      for (let v = 0; v < i; v++)
        for (let y = 0; y < s; y++)
          u.set(v, y, r[v * s + y]);
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
      for (let v = 0; v < i; v++)
        for (let y = 0; y < s; y++)
          u.set(v, y, o());
      return u;
    }
    static randInt(i, s, r = {}) {
      if (typeof r != "object")
        throw new TypeError("options must be an object");
      const { min: o = 0, max: u = 1e3, random: v = Math.random } = r;
      if (!Number.isInteger(o)) throw new TypeError("min must be an integer");
      if (!Number.isInteger(u)) throw new TypeError("max must be an integer");
      if (o >= u) throw new RangeError("min must be smaller than max");
      let y = u - o, S = new Q(i, s);
      for (let E = 0; E < i; E++)
        for (let O = 0; O < s; O++) {
          let T = o + Math.round(v() * y);
          S.set(E, O, T);
        }
      return S;
    }
    static eye(i, s, r) {
      s === void 0 && (s = i), r === void 0 && (r = 1);
      let o = Math.min(i, s), u = this.zeros(i, s);
      for (let v = 0; v < o; v++)
        u.set(v, v, r);
      return u;
    }
    static diag(i, s, r) {
      let o = i.length;
      s === void 0 && (s = o), r === void 0 && (r = s);
      let u = Math.min(o, s, r), v = this.zeros(s, r);
      for (let y = 0; y < u; y++)
        v.set(y, y, i[y]);
      return v;
    }
    static min(i, s) {
      i = this.checkMatrix(i), s = this.checkMatrix(s);
      let r = i.rows, o = i.columns, u = new Q(r, o);
      for (let v = 0; v < r; v++)
        for (let y = 0; y < o; y++)
          u.set(v, y, Math.min(i.get(v, y), s.get(v, y)));
      return u;
    }
    static max(i, s) {
      i = this.checkMatrix(i), s = this.checkMatrix(s);
      let r = i.rows, o = i.columns, u = new this(r, o);
      for (let v = 0; v < r; v++)
        for (let y = 0; y < o; y++)
          u.set(v, y, Math.max(i.get(v, y), s.get(v, y)));
      return u;
    }
    static checkMatrix(i) {
      return ie.isMatrix(i) ? i : new Q(i);
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
        for (let v = s + 1; v < this.rows; v++)
          this.get(i, v) !== 0 && (o = !1);
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
          for (let v = r; v < i.columns; v++)
            i.set(s, v, i.get(s, v) / u);
          for (let v = s + 1; v < i.rows; v++) {
            let y = i.get(v, r) / i.get(s, r);
            i.set(v, r, 0);
            for (let S = r + 1; S < i.columns; S++)
              i.set(v, S, i.get(v, S) - i.get(s, S) * y);
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
          let u = 0, v = !1;
          for (; u < r && v === !1; )
            i.get(o, u) === 1 ? v = !0 : u++;
          for (let y = 0; y < o; y++) {
            let S = i.get(y, u);
            for (let E = u; E < s; E++) {
              let O = i.get(y, E) - S * i.get(o, E);
              i.set(y, E, O);
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
        for (let v = 0; v < r; v++)
          o.setSubMatrix(this, this.rows * u, this.columns * v);
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
      g(this, i);
      let s = [];
      for (let r = 0; r < this.columns; r++)
        s.push(this.get(i, r));
      return s;
    }
    getRowVector(i) {
      return Q.rowVector(this.getRow(i));
    }
    setRow(i, s) {
      g(this, i), s = _(this, s);
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, s[r]);
      return this;
    }
    swapRows(i, s) {
      g(this, i), g(this, s);
      for (let r = 0; r < this.columns; r++) {
        let o = this.get(i, r);
        this.set(i, r, this.get(s, r)), this.set(s, r, o);
      }
      return this;
    }
    getColumn(i) {
      b(this, i);
      let s = [];
      for (let r = 0; r < this.rows; r++)
        s.push(this.get(r, i));
      return s;
    }
    getColumnVector(i) {
      return Q.columnVector(this.getColumn(i));
    }
    setColumn(i, s) {
      b(this, i), s = R(this, s);
      for (let r = 0; r < this.rows; r++)
        this.set(r, i, s[r]);
      return this;
    }
    swapColumns(i, s) {
      b(this, i), b(this, s);
      for (let r = 0; r < this.rows; r++) {
        let o = this.get(r, i);
        this.set(r, i, this.get(r, s)), this.set(r, s, o);
      }
      return this;
    }
    addRowVector(i) {
      i = _(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) + i[r]);
      return this;
    }
    subRowVector(i) {
      i = _(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) - i[r]);
      return this;
    }
    mulRowVector(i) {
      i = _(this, i);
      for (let s = 0; s < this.rows; s++)
        for (let r = 0; r < this.columns; r++)
          this.set(s, r, this.get(s, r) * i[r]);
      return this;
    }
    divRowVector(i) {
      i = _(this, i);
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
      g(this, i);
      for (let r = 0; r < this.columns; r++)
        this.set(i, r, this.get(i, r) * s);
      return this;
    }
    mulColumn(i, s) {
      b(this, i);
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
      Z(this);
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
      Z(this);
      let i = this.get(0, 0), s = [0, 0];
      for (let r = 0; r < this.rows; r++)
        for (let o = 0; o < this.columns; o++)
          this.get(r, o) < i && (i = this.get(r, o), s[0] = r, s[1] = o);
      return s;
    }
    maxRow(i) {
      if (g(this, i), this.isEmpty())
        return NaN;
      let s = this.get(i, 0);
      for (let r = 1; r < this.columns; r++)
        this.get(i, r) > s && (s = this.get(i, r));
      return s;
    }
    maxRowIndex(i) {
      g(this, i), Z(this);
      let s = this.get(i, 0), r = [i, 0];
      for (let o = 1; o < this.columns; o++)
        this.get(i, o) > s && (s = this.get(i, o), r[1] = o);
      return r;
    }
    minRow(i) {
      if (g(this, i), this.isEmpty())
        return NaN;
      let s = this.get(i, 0);
      for (let r = 1; r < this.columns; r++)
        this.get(i, r) < s && (s = this.get(i, r));
      return s;
    }
    minRowIndex(i) {
      g(this, i), Z(this);
      let s = this.get(i, 0), r = [i, 0];
      for (let o = 1; o < this.columns; o++)
        this.get(i, o) < s && (s = this.get(i, o), r[1] = o);
      return r;
    }
    maxColumn(i) {
      if (b(this, i), this.isEmpty())
        return NaN;
      let s = this.get(0, i);
      for (let r = 1; r < this.rows; r++)
        this.get(r, i) > s && (s = this.get(r, i));
      return s;
    }
    maxColumnIndex(i) {
      b(this, i), Z(this);
      let s = this.get(0, i), r = [0, i];
      for (let o = 1; o < this.rows; o++)
        this.get(o, i) > s && (s = this.get(o, i), r[0] = o);
      return r;
    }
    minColumn(i) {
      if (b(this, i), this.isEmpty())
        return NaN;
      let s = this.get(0, i);
      for (let r = 1; r < this.rows; r++)
        this.get(r, i) < s && (s = this.get(r, i));
      return s;
    }
    minColumnIndex(i) {
      b(this, i), Z(this);
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
      ie.isMatrix(i) && (i = i.to1DArray());
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
      let s = this.rows, r = this.columns, o = i.columns, u = new Q(s, o), v = new Float64Array(r);
      for (let y = 0; y < o; y++) {
        for (let S = 0; S < r; S++)
          v[S] = i.get(S, y);
        for (let S = 0; S < s; S++) {
          let E = 0;
          for (let O = 0; O < r; O++)
            E += this.get(S, O) * v[O];
          u.set(S, y, E);
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
      const r = this.get(0, 0), o = i.get(0, 0), u = this.get(0, 1), v = i.get(0, 1), y = this.get(1, 0), S = i.get(1, 0), E = this.get(1, 1), O = i.get(1, 1), T = (r + E) * (o + O), G = (y + E) * o, K = r * (v - O), j = E * (S - o), U = (r + u) * O, se = (y - r) * (o + v), C = (u - E) * (S + O), H = T + j - U + C, le = K + U, w = G + j, x = T - G + K + se;
      return s.set(0, 0, H), s.set(0, 1, le), s.set(1, 0, w), s.set(1, 1, x), s;
    }
    strassen3x3(i) {
      i = Q.checkMatrix(i);
      let s = new Q(3, 3);
      const r = this.get(0, 0), o = this.get(0, 1), u = this.get(0, 2), v = this.get(1, 0), y = this.get(1, 1), S = this.get(1, 2), E = this.get(2, 0), O = this.get(2, 1), T = this.get(2, 2), G = i.get(0, 0), K = i.get(0, 1), j = i.get(0, 2), U = i.get(1, 0), se = i.get(1, 1), C = i.get(1, 2), H = i.get(2, 0), le = i.get(2, 1), w = i.get(2, 2), x = (r + o + u - v - y - O - T) * se, N = (r - v) * (-K + se), M = y * (-G + K + U - se - C - H + w), I = (-r + v + y) * (G - K + se), V = (v + y) * (-G + K), L = r * G, q = (-r + E + O) * (G - j + C), Y = (-r + E) * (j - C), J = (E + O) * (-G + j), Ne = (r + o + u - y - S - E - O) * C, Ee = O * (-G + j + U - se - C - H + le), Te = (-u + O + T) * (se + H - le), Ce = (u - T) * (se - le), Fe = u * H, ot = (O + T) * (-H + le), ze = (-u + y + S) * (C + H - w), dt = (u - S) * (C - w), yt = (y + S) * (-H + w), ve = o * U, Be = S * le, Ke = v * j, He = E * K, $e = T * w, hs = L + Fe + ve, cs = x + I + V + L + Te + Fe + ot, fs = L + q + J + Ne + Fe + ze + yt, ds = N + M + I + L + Fe + ze + dt, gs = N + I + V + L + Be, ps = Fe + ze + dt + yt + Ke, ms = L + q + Y + Ee + Te + Ce + Fe, ws = Te + Ce + Fe + ot + He, ys = L + q + Y + J + $e;
      return s.set(0, 0, hs), s.set(0, 1, cs), s.set(0, 2, fs), s.set(1, 0, ds), s.set(1, 1, gs), s.set(1, 2, ps), s.set(2, 0, ms), s.set(2, 1, ws), s.set(2, 2, ys), s;
    }
    mmulStrassen(i) {
      i = Q.checkMatrix(i);
      let s = this.clone(), r = s.rows, o = s.columns, u = i.rows, v = i.columns;
      o !== u && console.warn(
        `Multiplying ${r} x ${o} and ${u} x ${v} matrix: dimensions do not match.`
      );
      function y(T, G, K) {
        let j = T.rows, U = T.columns;
        if (j === G && U === K)
          return T;
        {
          let se = ie.zeros(G, K);
          return se = se.setSubMatrix(T, 0, 0), se;
        }
      }
      let S = Math.max(r, u), E = Math.max(o, v);
      s = y(s, S, E), i = y(i, S, E);
      function O(T, G, K, j) {
        if (K <= 512 || j <= 512)
          return T.mmul(G);
        K % 2 === 1 && j % 2 === 1 ? (T = y(T, K + 1, j + 1), G = y(G, K + 1, j + 1)) : K % 2 === 1 ? (T = y(T, K + 1, j), G = y(G, K + 1, j)) : j % 2 === 1 && (T = y(T, K, j + 1), G = y(G, K, j + 1));
        let U = parseInt(T.rows / 2, 10), se = parseInt(T.columns / 2, 10), C = T.subMatrix(0, U - 1, 0, se - 1), H = G.subMatrix(0, U - 1, 0, se - 1), le = T.subMatrix(0, U - 1, se, T.columns - 1), w = G.subMatrix(0, U - 1, se, G.columns - 1), x = T.subMatrix(U, T.rows - 1, 0, se - 1), N = G.subMatrix(U, G.rows - 1, 0, se - 1), M = T.subMatrix(U, T.rows - 1, se, T.columns - 1), I = G.subMatrix(U, G.rows - 1, se, G.columns - 1), V = O(
          ie.add(C, M),
          ie.add(H, I),
          U,
          se
        ), L = O(ie.add(x, M), H, U, se), q = O(C, ie.sub(w, I), U, se), Y = O(M, ie.sub(N, H), U, se), J = O(ie.add(C, le), I, U, se), Ne = O(
          ie.sub(x, C),
          ie.add(H, w),
          U,
          se
        ), Ee = O(
          ie.sub(le, M),
          ie.add(N, I),
          U,
          se
        ), Te = ie.add(V, Y);
        Te.sub(J), Te.add(Ee);
        let Ce = ie.add(q, J), Fe = ie.add(L, Y), ot = ie.sub(V, L);
        ot.add(q), ot.add(Ne);
        let ze = ie.zeros(2 * Te.rows, 2 * Te.columns);
        return ze = ze.setSubMatrix(Te, 0, 0), ze = ze.setSubMatrix(Ce, Te.rows, 0), ze = ze.setSubMatrix(Fe, 0, Te.columns), ze = ze.setSubMatrix(ot, Te.rows, Te.columns), ze.subMatrix(0, K - 1, 0, j - 1);
      }
      return O(s, i, S, E);
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
        const v = this.getRow(u);
        v.length > 0 && t(v, { min: s, max: r, output: v }), o.setRow(u, v);
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
        const v = this.getColumn(u);
        v.length && t(v, {
          min: s,
          max: r,
          output: v
        }), o.setColumn(u, v);
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
      let s = this.rows, r = this.columns, o = i.rows, u = i.columns, v = new Q(s * o, r * u);
      for (let y = 0; y < s; y++)
        for (let S = 0; S < r; S++)
          for (let E = 0; E < o; E++)
            for (let O = 0; O < u; O++)
              v.set(o * y + E, u * S + O, this.get(y, S) * i.get(E, O));
      return v;
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
    sortRows(i = Re) {
      for (let s = 0; s < this.rows; s++)
        this.setRow(s, this.getRow(s).sort(i));
      return this;
    }
    sortColumns(i = Re) {
      for (let s = 0; s < this.columns; s++)
        this.setColumn(s, this.getColumn(s).sort(i));
      return this;
    }
    subMatrix(i, s, r, o) {
      $(this, i, s, r, o);
      let u = new Q(
        s - i + 1,
        o - r + 1
      );
      for (let v = i; v <= s; v++)
        for (let y = r; y <= o; y++)
          u.set(v - i, y - r, this.get(v, y));
      return u;
    }
    subMatrixRow(i, s, r) {
      if (s === void 0 && (s = 0), r === void 0 && (r = this.columns - 1), s > r || s < 0 || s >= this.columns || r < 0 || r >= this.columns)
        throw new RangeError("Argument out of range");
      let o = new Q(i.length, r - s + 1);
      for (let u = 0; u < i.length; u++)
        for (let v = s; v <= r; v++) {
          if (i[u] < 0 || i[u] >= this.rows)
            throw new RangeError(`Row index out of range: ${i[u]}`);
          o.set(u, v - s, this.get(i[u], v));
        }
      return o;
    }
    subMatrixColumn(i, s, r) {
      if (s === void 0 && (s = 0), r === void 0 && (r = this.rows - 1), s > r || s < 0 || s >= this.rows || r < 0 || r >= this.rows)
        throw new RangeError("Argument out of range");
      let o = new Q(r - s + 1, i.length);
      for (let u = 0; u < i.length; u++)
        for (let v = s; v <= r; v++) {
          if (i[u] < 0 || i[u] >= this.columns)
            throw new RangeError(`Column index out of range: ${i[u]}`);
          o.set(v - s, u, this.get(v, i[u]));
        }
      return o;
    }
    setSubMatrix(i, s, r) {
      if (i = Q.checkMatrix(i), i.isEmpty())
        return this;
      let o = s + i.rows - 1, u = r + i.columns - 1;
      $(this, s, o, r, u);
      for (let v = 0; v < i.rows; v++)
        for (let y = 0; y < i.columns; y++)
          this.set(s + v, r + y, i.get(v, y));
      return this;
    }
    selection(i, s) {
      z(this, i), F(this, s);
      let r = new Q(i.length, s.length);
      for (let o = 0; o < i.length; o++) {
        let u = i[o];
        for (let v = 0; v < s.length; v++) {
          let y = s[v];
          r.set(o, v, this.get(u, y));
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
          return P(this);
        case "column":
          return D(this);
        case void 0:
          return te(this);
        default:
          throw new Error(`invalid option: ${i}`);
      }
    }
    product(i) {
      switch (i) {
        case "row":
          return ne(this);
        case "column":
          return he(this);
        case void 0:
          return ge(this);
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
          return re(this, r, o);
        }
        case "column": {
          if (!e.isAnyArray(o))
            throw new TypeError("mean must be an array");
          return de(this, r, o);
        }
        case void 0: {
          if (typeof o != "number")
            throw new TypeError("mean must be a number");
          return ye(this, r, o);
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
          return ae(this, r), this;
        }
        case "column": {
          if (!e.isAnyArray(r))
            throw new TypeError("center must be an array");
          return A(this, r), this;
        }
        case void 0: {
          if (typeof r != "number")
            throw new TypeError("center must be a number");
          return ee(this, r), this;
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
          return oe(this, r), this;
        }
        case "column": {
          if (r === void 0)
            r = ue(this);
          else if (!e.isAnyArray(r))
            throw new TypeError("scale must be an array");
          return fe(this, r), this;
        }
        case void 0: {
          if (r === void 0)
            r = pe(this);
          else if (typeof r != "number")
            throw new TypeError("scale must be a number");
          return me(this, r), this;
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
  ie.prototype.klass = "Matrix", typeof Symbol < "u" && (ie.prototype[Symbol.for("nodejs.util.inspect.custom")] = a);
  function Re(p, i) {
    return p - i;
  }
  function Se(p) {
    return p.every((i) => typeof i == "number");
  }
  ie.random = ie.rand, ie.randomInt = ie.randInt, ie.diagonal = ie.diag, ie.prototype.diagonal = ie.prototype.diag, ie.identity = ie.eye, ie.prototype.negate = ie.prototype.neg, ie.prototype.tensorProduct = ie.prototype.kroneckerProduct;
  class Q extends ie {
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
          if (!Se(r[o]))
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
      return g(this, i), this.data.splice(i, 1), this.rows -= 1, this;
    }
    addRow(i, s) {
      return s === void 0 && (s = i, i = this.rows), g(this, i, !0), s = Float64Array.from(_(this, s)), this.data.splice(i, 0, s), this.rows += 1, this;
    }
    removeColumn(i) {
      b(this, i);
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
      typeof s > "u" && (s = i, i = this.columns), b(this, i, !0), s = R(this, s);
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
  m(ie, Q);
  class Me extends ie {
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
      const i = new Me(this.diagonalSize);
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
      const o = new Me(r);
      for (let u = 0, v = 0, y = 0; y < s; y++)
        o.set(u, v, i[y]), ++u >= r && (u = ++v);
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
  Me.prototype.klassType = "SymmetricMatrix";
  class Le extends Me {
    /**
     * not the same as matrix.isSymmetric()
     * Here is to check if it's instanceof SymmetricMatrix without bundling issues
     *
     * @param value
     * @returns {boolean}
     */
    static isDistanceMatrix(i) {
      return Me.isSymmetricMatrix(i) && i.klassSubType === "DistanceMatrix";
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
      return new Me(this);
    }
    clone() {
      const i = new Le(this.diagonalSize);
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
      for (let o = 1, u = 0, v = 0; v < r.length; v++)
        r[v] = this.get(u, o), ++o >= i && (o = ++u + 1);
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
      for (let u = 1, v = 0, y = 0; y < s; y++)
        o.set(u, v, i[y]), ++u >= r && (u = ++v + 1);
      return o;
    }
  }
  Le.prototype.klassSubType = "DistanceMatrix";
  class xe extends ie {
    constructor(i, s, r) {
      super(), this.matrix = i, this.rows = s, this.columns = r;
    }
  }
  class Oe extends xe {
    constructor(i, s) {
      b(i, s), super(i, i.rows, 1), this.column = s;
    }
    set(i, s, r) {
      return this.matrix.set(i, this.column, r), this;
    }
    get(i) {
      return this.matrix.get(i, this.column);
    }
  }
  class ct extends xe {
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
  class ft extends xe {
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
  class Tt extends xe {
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
  class Rt extends xe {
    constructor(i, s) {
      g(i, s), super(i, 1, i.columns), this.row = s;
    }
    set(i, s, r) {
      return this.matrix.set(this.row, s, r), this;
    }
    get(i, s) {
      return this.matrix.get(this.row, s);
    }
  }
  class yn extends xe {
    constructor(i, s) {
      z(i, s), super(i, s.length, i.columns), this.rowIndices = s;
    }
    set(i, s, r) {
      return this.matrix.set(this.rowIndices[i], s, r), this;
    }
    get(i, s) {
      return this.matrix.get(this.rowIndices[i], s);
    }
  }
  class Ct extends xe {
    constructor(i, s, r) {
      z(i, s), F(i, r), super(i, s.length, r.length), this.rowIndices = s, this.columnIndices = r;
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
  class tr extends xe {
    constructor(i, s, r, o, u) {
      $(i, s, r, o, u), super(i, r - s + 1, u - o + 1), this.startRow = s, this.startColumn = o;
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
  class nr extends xe {
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
  class Ae extends ie {
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
  class De extends ie {
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
  function vn(p, i) {
    if (e.isAnyArray(p))
      return p[0] && e.isAnyArray(p[0]) ? new De(p) : new Ae(p, i);
    throw new Error("the argument is not an array");
  }
  class It {
    constructor(i) {
      i = De.checkMatrix(i);
      let s = i.clone(), r = s.rows, o = s.columns, u = new Float64Array(r), v = 1, y, S, E, O, T, G, K, j, U;
      for (y = 0; y < r; y++)
        u[y] = y;
      for (j = new Float64Array(r), S = 0; S < o; S++) {
        for (y = 0; y < r; y++)
          j[y] = s.get(y, S);
        for (y = 0; y < r; y++) {
          for (U = Math.min(y, S), T = 0, E = 0; E < U; E++)
            T += s.get(y, E) * j[E];
          j[y] -= T, s.set(y, S, j[y]);
        }
        for (O = S, y = S + 1; y < r; y++)
          Math.abs(j[y]) > Math.abs(j[O]) && (O = y);
        if (O !== S) {
          for (E = 0; E < o; E++)
            G = s.get(O, E), s.set(O, E, s.get(S, E)), s.set(S, E, G);
          K = u[O], u[O] = u[S], u[S] = K, v = -v;
        }
        if (S < r && s.get(S, S) !== 0)
          for (y = S + 1; y < r; y++)
            s.set(y, S, s.get(y, S) / s.get(S, S));
      }
      this.LU = s, this.pivotVector = u, this.pivotSign = v;
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
      let o = i.columns, u = i.subMatrixRow(this.pivotVector, 0, o - 1), v = s.columns, y, S, E;
      for (E = 0; E < v; E++)
        for (y = E + 1; y < v; y++)
          for (S = 0; S < o; S++)
            u.set(y, S, u.get(y, S) - u.get(E, S) * s.get(y, E));
      for (E = v - 1; E >= 0; E--) {
        for (S = 0; S < o; S++)
          u.set(E, S, u.get(E, S) / s.get(E, E));
        for (y = 0; y < E; y++)
          for (S = 0; S < o; S++)
            u.set(y, S, u.get(y, S) - u.get(E, S) * s.get(y, E));
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
        for (let v = 0; v < r; v++)
          u > v ? o.set(u, v, i.get(u, v)) : u === v ? o.set(u, v, 1) : o.set(u, v, 0);
      return o;
    }
    get upperTriangularMatrix() {
      let i = this.LU, s = i.rows, r = i.columns, o = new Q(s, r);
      for (let u = 0; u < s; u++)
        for (let v = 0; v < r; v++)
          u <= v ? o.set(u, v, i.get(u, v)) : o.set(u, v, 0);
      return o;
    }
    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }
  }
  function st(p, i) {
    let s = 0;
    return Math.abs(p) > Math.abs(i) ? (s = i / p, Math.abs(p) * Math.sqrt(1 + s * s)) : i !== 0 ? (s = p / i, Math.abs(i) * Math.sqrt(1 + s * s)) : 0;
  }
  class Jt {
    constructor(i) {
      i = De.checkMatrix(i);
      let s = i.clone(), r = i.rows, o = i.columns, u = new Float64Array(o), v, y, S, E;
      for (S = 0; S < o; S++) {
        let O = 0;
        for (v = S; v < r; v++)
          O = st(O, s.get(v, S));
        if (O !== 0) {
          for (s.get(S, S) < 0 && (O = -O), v = S; v < r; v++)
            s.set(v, S, s.get(v, S) / O);
          for (s.set(S, S, s.get(S, S) + 1), y = S + 1; y < o; y++) {
            for (E = 0, v = S; v < r; v++)
              E += s.get(v, S) * s.get(v, y);
            for (E = -E / s.get(S, S), v = S; v < r; v++)
              s.set(v, y, s.get(v, y) + E * s.get(v, S));
          }
        }
        u[S] = -O;
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
      let o = i.columns, u = i.clone(), v = s.columns, y, S, E, O;
      for (E = 0; E < v; E++)
        for (S = 0; S < o; S++) {
          for (O = 0, y = E; y < r; y++)
            O += s.get(y, E) * u.get(y, S);
          for (O = -O / s.get(E, E), y = E; y < r; y++)
            u.set(y, S, u.get(y, S) + O * s.get(y, E));
        }
      for (E = v - 1; E >= 0; E--) {
        for (S = 0; S < o; S++)
          u.set(E, S, u.get(E, S) / this.Rdiag[E]);
        for (y = 0; y < E; y++)
          for (S = 0; S < o; S++)
            u.set(y, S, u.get(y, S) - u.get(E, S) * s.get(y, E));
      }
      return u.subMatrix(0, v - 1, 0, o - 1);
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
      let i = this.QR, s = i.rows, r = i.columns, o = new Q(s, r), u, v, y, S;
      for (y = r - 1; y >= 0; y--) {
        for (u = 0; u < s; u++)
          o.set(u, y, 0);
        for (o.set(y, y, 1), v = y; v < r; v++)
          if (i.get(y, y) !== 0) {
            for (S = 0, u = y; u < s; u++)
              S += i.get(u, y) * o.get(u, v);
            for (S = -S / i.get(y, y), u = y; u < s; u++)
              o.set(u, v, o.get(u, v) + S * i.get(u, y));
          }
      }
      return o;
    }
  }
  class xt {
    constructor(i, s = {}) {
      if (i = De.checkMatrix(i), i.isEmpty())
        throw new Error("Matrix must be non-empty");
      let r = i.rows, o = i.columns;
      const {
        computeLeftSingularVectors: u = !0,
        computeRightSingularVectors: v = !0,
        autoTranspose: y = !1
      } = s;
      let S = !!u, E = !!v, O = !1, T;
      if (r < o)
        if (!y)
          T = i.clone(), console.warn(
            "Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose"
          );
        else {
          T = i.transpose(), r = T.rows, o = T.columns, O = !0;
          let L = S;
          S = E, E = L;
        }
      else
        T = i.clone();
      let G = Math.min(r, o), K = Math.min(r + 1, o), j = new Float64Array(K), U = new Q(r, G), se = new Q(o, o), C = new Float64Array(o), H = new Float64Array(r), le = new Float64Array(K);
      for (let L = 0; L < K; L++) le[L] = L;
      let w = Math.min(r - 1, o), x = Math.max(0, Math.min(o - 2, r)), N = Math.max(w, x);
      for (let L = 0; L < N; L++) {
        if (L < w) {
          j[L] = 0;
          for (let q = L; q < r; q++)
            j[L] = st(j[L], T.get(q, L));
          if (j[L] !== 0) {
            T.get(L, L) < 0 && (j[L] = -j[L]);
            for (let q = L; q < r; q++)
              T.set(q, L, T.get(q, L) / j[L]);
            T.set(L, L, T.get(L, L) + 1);
          }
          j[L] = -j[L];
        }
        for (let q = L + 1; q < o; q++) {
          if (L < w && j[L] !== 0) {
            let Y = 0;
            for (let J = L; J < r; J++)
              Y += T.get(J, L) * T.get(J, q);
            Y = -Y / T.get(L, L);
            for (let J = L; J < r; J++)
              T.set(J, q, T.get(J, q) + Y * T.get(J, L));
          }
          C[q] = T.get(L, q);
        }
        if (S && L < w)
          for (let q = L; q < r; q++)
            U.set(q, L, T.get(q, L));
        if (L < x) {
          C[L] = 0;
          for (let q = L + 1; q < o; q++)
            C[L] = st(C[L], C[q]);
          if (C[L] !== 0) {
            C[L + 1] < 0 && (C[L] = 0 - C[L]);
            for (let q = L + 1; q < o; q++)
              C[q] /= C[L];
            C[L + 1] += 1;
          }
          if (C[L] = -C[L], L + 1 < r && C[L] !== 0) {
            for (let q = L + 1; q < r; q++)
              H[q] = 0;
            for (let q = L + 1; q < r; q++)
              for (let Y = L + 1; Y < o; Y++)
                H[q] += C[Y] * T.get(q, Y);
            for (let q = L + 1; q < o; q++) {
              let Y = -C[q] / C[L + 1];
              for (let J = L + 1; J < r; J++)
                T.set(J, q, T.get(J, q) + Y * H[J]);
            }
          }
          if (E)
            for (let q = L + 1; q < o; q++)
              se.set(q, L, C[q]);
        }
      }
      let M = Math.min(o, r + 1);
      if (w < o && (j[w] = T.get(w, w)), r < M && (j[M - 1] = 0), x + 1 < M && (C[x] = T.get(x, M - 1)), C[M - 1] = 0, S) {
        for (let L = w; L < G; L++) {
          for (let q = 0; q < r; q++)
            U.set(q, L, 0);
          U.set(L, L, 1);
        }
        for (let L = w - 1; L >= 0; L--)
          if (j[L] !== 0) {
            for (let q = L + 1; q < G; q++) {
              let Y = 0;
              for (let J = L; J < r; J++)
                Y += U.get(J, L) * U.get(J, q);
              Y = -Y / U.get(L, L);
              for (let J = L; J < r; J++)
                U.set(J, q, U.get(J, q) + Y * U.get(J, L));
            }
            for (let q = L; q < r; q++)
              U.set(q, L, -U.get(q, L));
            U.set(L, L, 1 + U.get(L, L));
            for (let q = 0; q < L - 1; q++)
              U.set(q, L, 0);
          } else {
            for (let q = 0; q < r; q++)
              U.set(q, L, 0);
            U.set(L, L, 1);
          }
      }
      if (E)
        for (let L = o - 1; L >= 0; L--) {
          if (L < x && C[L] !== 0)
            for (let q = L + 1; q < o; q++) {
              let Y = 0;
              for (let J = L + 1; J < o; J++)
                Y += se.get(J, L) * se.get(J, q);
              Y = -Y / se.get(L + 1, L);
              for (let J = L + 1; J < o; J++)
                se.set(J, q, se.get(J, q) + Y * se.get(J, L));
            }
          for (let q = 0; q < o; q++)
            se.set(q, L, 0);
          se.set(L, L, 1);
        }
      let I = M - 1, V = Number.EPSILON;
      for (; M > 0; ) {
        let L, q;
        for (L = M - 2; L >= -1 && L !== -1; L--) {
          const Y = Number.MIN_VALUE + V * Math.abs(j[L] + Math.abs(j[L + 1]));
          if (Math.abs(C[L]) <= Y || Number.isNaN(C[L])) {
            C[L] = 0;
            break;
          }
        }
        if (L === M - 2)
          q = 4;
        else {
          let Y;
          for (Y = M - 1; Y >= L && Y !== L; Y--) {
            let J = (Y !== M ? Math.abs(C[Y]) : 0) + (Y !== L + 1 ? Math.abs(C[Y - 1]) : 0);
            if (Math.abs(j[Y]) <= V * J) {
              j[Y] = 0;
              break;
            }
          }
          Y === L ? q = 3 : Y === M - 1 ? q = 1 : (q = 2, L = Y);
        }
        switch (L++, q) {
          case 1: {
            let Y = C[M - 2];
            C[M - 2] = 0;
            for (let J = M - 2; J >= L; J--) {
              let Ne = st(j[J], Y), Ee = j[J] / Ne, Te = Y / Ne;
              if (j[J] = Ne, J !== L && (Y = -Te * C[J - 1], C[J - 1] = Ee * C[J - 1]), E)
                for (let Ce = 0; Ce < o; Ce++)
                  Ne = Ee * se.get(Ce, J) + Te * se.get(Ce, M - 1), se.set(Ce, M - 1, -Te * se.get(Ce, J) + Ee * se.get(Ce, M - 1)), se.set(Ce, J, Ne);
            }
            break;
          }
          case 2: {
            let Y = C[L - 1];
            C[L - 1] = 0;
            for (let J = L; J < M; J++) {
              let Ne = st(j[J], Y), Ee = j[J] / Ne, Te = Y / Ne;
              if (j[J] = Ne, Y = -Te * C[J], C[J] = Ee * C[J], S)
                for (let Ce = 0; Ce < r; Ce++)
                  Ne = Ee * U.get(Ce, J) + Te * U.get(Ce, L - 1), U.set(Ce, L - 1, -Te * U.get(Ce, J) + Ee * U.get(Ce, L - 1)), U.set(Ce, J, Ne);
            }
            break;
          }
          case 3: {
            const Y = Math.max(
              Math.abs(j[M - 1]),
              Math.abs(j[M - 2]),
              Math.abs(C[M - 2]),
              Math.abs(j[L]),
              Math.abs(C[L])
            ), J = j[M - 1] / Y, Ne = j[M - 2] / Y, Ee = C[M - 2] / Y, Te = j[L] / Y, Ce = C[L] / Y, Fe = ((Ne + J) * (Ne - J) + Ee * Ee) / 2, ot = J * Ee * (J * Ee);
            let ze = 0;
            (Fe !== 0 || ot !== 0) && (Fe < 0 ? ze = 0 - Math.sqrt(Fe * Fe + ot) : ze = Math.sqrt(Fe * Fe + ot), ze = ot / (Fe + ze));
            let dt = (Te + J) * (Te - J) + ze, yt = Te * Ce;
            for (let ve = L; ve < M - 1; ve++) {
              let Be = st(dt, yt);
              Be === 0 && (Be = Number.MIN_VALUE);
              let Ke = dt / Be, He = yt / Be;
              if (ve !== L && (C[ve - 1] = Be), dt = Ke * j[ve] + He * C[ve], C[ve] = Ke * C[ve] - He * j[ve], yt = He * j[ve + 1], j[ve + 1] = Ke * j[ve + 1], E)
                for (let $e = 0; $e < o; $e++)
                  Be = Ke * se.get($e, ve) + He * se.get($e, ve + 1), se.set($e, ve + 1, -He * se.get($e, ve) + Ke * se.get($e, ve + 1)), se.set($e, ve, Be);
              if (Be = st(dt, yt), Be === 0 && (Be = Number.MIN_VALUE), Ke = dt / Be, He = yt / Be, j[ve] = Be, dt = Ke * C[ve] + He * j[ve + 1], j[ve + 1] = -He * C[ve] + Ke * j[ve + 1], yt = He * C[ve + 1], C[ve + 1] = Ke * C[ve + 1], S && ve < r - 1)
                for (let $e = 0; $e < r; $e++)
                  Be = Ke * U.get($e, ve) + He * U.get($e, ve + 1), U.set($e, ve + 1, -He * U.get($e, ve) + Ke * U.get($e, ve + 1)), U.set($e, ve, Be);
            }
            C[M - 2] = dt;
            break;
          }
          case 4: {
            if (j[L] <= 0 && (j[L] = j[L] < 0 ? -j[L] : 0, E))
              for (let Y = 0; Y <= I; Y++)
                se.set(Y, L, -se.get(Y, L));
            for (; L < I && !(j[L] >= j[L + 1]); ) {
              let Y = j[L];
              if (j[L] = j[L + 1], j[L + 1] = Y, E && L < o - 1)
                for (let J = 0; J < o; J++)
                  Y = se.get(J, L + 1), se.set(J, L + 1, se.get(J, L)), se.set(J, L, Y);
              if (S && L < r - 1)
                for (let J = 0; J < r; J++)
                  Y = U.get(J, L + 1), U.set(J, L + 1, U.get(J, L)), U.set(J, L, Y);
              L++;
            }
            M--;
            break;
          }
        }
      }
      if (O) {
        let L = se;
        se = U, U = L;
      }
      this.m = r, this.n = o, this.s = j, this.U = U, this.V = se;
    }
    solve(i) {
      let s = i, r = this.threshold, o = this.s.length, u = Q.zeros(o, o);
      for (let G = 0; G < o; G++)
        Math.abs(this.s[G]) <= r ? u.set(G, G, 0) : u.set(G, G, 1 / this.s[G]);
      let v = this.U, y = this.rightSingularVectors, S = y.mmul(u), E = y.rows, O = v.rows, T = Q.zeros(E, O);
      for (let G = 0; G < E; G++)
        for (let K = 0; K < O; K++) {
          let j = 0;
          for (let U = 0; U < o; U++)
            j += S.get(G, U) * v.get(K, U);
          T.set(G, K, j);
        }
      return T.mmul(s);
    }
    solveForDiagonal(i) {
      return this.solve(Q.diag(i));
    }
    inverse() {
      let i = this.V, s = this.threshold, r = i.rows, o = i.columns, u = new Q(r, this.s.length);
      for (let O = 0; O < r; O++)
        for (let T = 0; T < o; T++)
          Math.abs(this.s[T]) > s && u.set(O, T, i.get(O, T) / this.s[T]);
      let v = this.U, y = v.rows, S = v.columns, E = new Q(r, y);
      for (let O = 0; O < r; O++)
        for (let T = 0; T < y; T++) {
          let G = 0;
          for (let K = 0; K < S; K++)
            G += u.get(O, K) * v.get(T, K);
          E.set(O, T, G);
        }
      return E;
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
  function Pe(p, i = !1) {
    return p = De.checkMatrix(p), i ? new xt(p).inverse() : bn(p, Q.eye(p.rows));
  }
  function bn(p, i, s = !1) {
    return p = De.checkMatrix(p), i = De.checkMatrix(i), s ? new xt(p).solve(i) : p.isSquare() ? new It(p).solve(i) : new Jt(p).solve(i);
  }
  function Dt(p) {
    if (p = Q.checkMatrix(p), p.isSquare()) {
      if (p.columns === 0)
        return 1;
      let i, s, r, o;
      if (p.columns === 2)
        return i = p.get(0, 0), s = p.get(0, 1), r = p.get(1, 0), o = p.get(1, 1), i * o - s * r;
      if (p.columns === 3) {
        let u, v, y;
        return u = new Ct(p, [1, 2], [1, 2]), v = new Ct(p, [1, 2], [0, 2]), y = new Ct(p, [1, 2], [0, 1]), i = p.get(0, 0), s = p.get(0, 1), r = p.get(0, 2), i * Dt(u) - s * Dt(v) + r * Dt(y);
      } else
        return new It(p).determinant;
    } else
      throw Error("determinant can only be calculated for a square matrix");
  }
  function _n(p, i) {
    let s = [];
    for (let r = 0; r < p; r++)
      r !== i && s.push(r);
    return s;
  }
  function rr(p, i, s, r = 1e-9, o = 1e-9) {
    if (p > o)
      return new Array(i.rows + 1).fill(0);
    {
      let u = i.addRow(s, [0]);
      for (let v = 0; v < u.rows; v++)
        Math.abs(u.get(v, 0)) < r && u.set(v, 0, 0);
      return u.to1DArray();
    }
  }
  function ir(p, i = {}) {
    const { thresholdValue: s = 1e-9, thresholdError: r = 1e-9 } = i;
    p = Q.checkMatrix(p);
    let o = p.rows, u = new Q(o, o);
    for (let v = 0; v < o; v++) {
      let y = Q.columnVector(p.getRow(v)), S = p.subMatrixRow(_n(o, v)).transpose(), O = new xt(S).solve(y), T = Q.sub(y, S.mmul(O)).abs().max();
      u.setRow(
        v,
        rr(T, O, v, s, r)
      );
    }
    return u;
  }
  function xn(p, i = Number.EPSILON) {
    if (p = Q.checkMatrix(p), p.isEmpty())
      return p.transpose();
    let s = new xt(p, { autoTranspose: !0 }), r = s.leftSingularVectors, o = s.rightSingularVectors, u = s.diagonal;
    for (let v = 0; v < u.length; v++)
      Math.abs(u[v]) > i ? u[v] = 1 / u[v] : u[v] = 0;
    return o.mmul(Q.diag(u).mmul(r.transpose()));
  }
  function sr(p, i = p, s = {}) {
    p = new Q(p);
    let r = !1;
    if (typeof i == "object" && !Q.isMatrix(i) && !e.isAnyArray(i) ? (s = i, i = p, r = !0) : i = new Q(i), p.rows !== i.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: o = !0 } = s;
    o && (p = p.center("column"), r || (i = i.center("column")));
    const u = p.transpose().mmul(i);
    for (let v = 0; v < u.rows; v++)
      for (let y = 0; y < u.columns; y++)
        u.set(v, y, u.get(v, y) * (1 / (p.rows - 1)));
    return u;
  }
  function or(p, i = p, s = {}) {
    p = new Q(p);
    let r = !1;
    if (typeof i == "object" && !Q.isMatrix(i) && !e.isAnyArray(i) ? (s = i, i = p, r = !0) : i = new Q(i), p.rows !== i.rows)
      throw new TypeError("Both matrices must have the same number of rows");
    const { center: o = !0, scale: u = !0 } = s;
    o && (p.center("column"), r || i.center("column")), u && (p.scale("column"), r || i.scale("column"));
    const v = p.standardDeviation("column", { unbiased: !0 }), y = r ? v : i.standardDeviation("column", { unbiased: !0 }), S = p.transpose().mmul(i);
    for (let E = 0; E < S.rows; E++)
      for (let O = 0; O < S.columns; O++)
        S.set(
          E,
          O,
          S.get(E, O) * (1 / (v[E] * y[O])) * (1 / (p.rows - 1))
        );
    return S;
  }
  class Zt {
    constructor(i, s = {}) {
      const { assumeSymmetric: r = !1 } = s;
      if (i = De.checkMatrix(i), !i.isSquare())
        throw new Error("Matrix is not a square matrix");
      if (i.isEmpty())
        throw new Error("Matrix must be non-empty");
      let o = i.columns, u = new Q(o, o), v = new Float64Array(o), y = new Float64Array(o), S = i, E, O, T = !1;
      if (r ? T = !0 : T = i.isSymmetric(), T) {
        for (E = 0; E < o; E++)
          for (O = 0; O < o; O++)
            u.set(E, O, S.get(E, O));
        lr(o, y, v, u), En(o, y, v, u);
      } else {
        let G = new Q(o, o), K = new Float64Array(o);
        for (O = 0; O < o; O++)
          for (E = 0; E < o; E++)
            G.set(E, O, S.get(E, O));
        Sn(o, G, K, u), kn(o, y, v, u, G);
      }
      this.n = o, this.e = y, this.d = v, this.V = u;
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
      let i = this.n, s = this.e, r = this.d, o = new Q(i, i), u, v;
      for (u = 0; u < i; u++) {
        for (v = 0; v < i; v++)
          o.set(u, v, 0);
        o.set(u, u, r[u]), s[u] > 0 ? o.set(u, u + 1, s[u]) : s[u] < 0 && o.set(u, u - 1, s[u]);
      }
      return o;
    }
  }
  function lr(p, i, s, r) {
    let o, u, v, y, S, E, O, T;
    for (S = 0; S < p; S++)
      s[S] = r.get(p - 1, S);
    for (y = p - 1; y > 0; y--) {
      for (T = 0, v = 0, E = 0; E < y; E++)
        T = T + Math.abs(s[E]);
      if (T === 0)
        for (i[y] = s[y - 1], S = 0; S < y; S++)
          s[S] = r.get(y - 1, S), r.set(y, S, 0), r.set(S, y, 0);
      else {
        for (E = 0; E < y; E++)
          s[E] /= T, v += s[E] * s[E];
        for (o = s[y - 1], u = Math.sqrt(v), o > 0 && (u = -u), i[y] = T * u, v = v - o * u, s[y - 1] = o - u, S = 0; S < y; S++)
          i[S] = 0;
        for (S = 0; S < y; S++) {
          for (o = s[S], r.set(S, y, o), u = i[S] + r.get(S, S) * o, E = S + 1; E <= y - 1; E++)
            u += r.get(E, S) * s[E], i[E] += r.get(E, S) * o;
          i[S] = u;
        }
        for (o = 0, S = 0; S < y; S++)
          i[S] /= v, o += i[S] * s[S];
        for (O = o / (v + v), S = 0; S < y; S++)
          i[S] -= O * s[S];
        for (S = 0; S < y; S++) {
          for (o = s[S], u = i[S], E = S; E <= y - 1; E++)
            r.set(E, S, r.get(E, S) - (o * i[E] + u * s[E]));
          s[S] = r.get(y - 1, S), r.set(y, S, 0);
        }
      }
      s[y] = v;
    }
    for (y = 0; y < p - 1; y++) {
      if (r.set(p - 1, y, r.get(y, y)), r.set(y, y, 1), v = s[y + 1], v !== 0) {
        for (E = 0; E <= y; E++)
          s[E] = r.get(E, y + 1) / v;
        for (S = 0; S <= y; S++) {
          for (u = 0, E = 0; E <= y; E++)
            u += r.get(E, y + 1) * r.get(E, S);
          for (E = 0; E <= y; E++)
            r.set(E, S, r.get(E, S) - u * s[E]);
        }
      }
      for (E = 0; E <= y; E++)
        r.set(E, y + 1, 0);
    }
    for (S = 0; S < p; S++)
      s[S] = r.get(p - 1, S), r.set(p - 1, S, 0);
    r.set(p - 1, p - 1, 1), i[0] = 0;
  }
  function En(p, i, s, r) {
    let o, u, v, y, S, E, O, T, G, K, j, U, se, C, H, le;
    for (v = 1; v < p; v++)
      i[v - 1] = i[v];
    i[p - 1] = 0;
    let w = 0, x = 0, N = Number.EPSILON;
    for (E = 0; E < p; E++) {
      for (x = Math.max(x, Math.abs(s[E]) + Math.abs(i[E])), O = E; O < p && !(Math.abs(i[O]) <= N * x); )
        O++;
      if (O > E)
        do {
          for (o = s[E], T = (s[E + 1] - o) / (2 * i[E]), G = st(T, 1), T < 0 && (G = -G), s[E] = i[E] / (T + G), s[E + 1] = i[E] * (T + G), K = s[E + 1], u = o - s[E], v = E + 2; v < p; v++)
            s[v] -= u;
          for (w = w + u, T = s[O], j = 1, U = j, se = j, C = i[E + 1], H = 0, le = 0, v = O - 1; v >= E; v--)
            for (se = U, U = j, le = H, o = j * i[v], u = j * T, G = st(T, i[v]), i[v + 1] = H * G, H = i[v] / G, j = T / G, T = j * s[v] - H * o, s[v + 1] = u + H * (j * o + H * s[v]), S = 0; S < p; S++)
              u = r.get(S, v + 1), r.set(S, v + 1, H * r.get(S, v) + j * u), r.set(S, v, j * r.get(S, v) - H * u);
          T = -H * le * se * C * i[E] / K, i[E] = H * T, s[E] = j * T;
        } while (Math.abs(i[E]) > N * x);
      s[E] = s[E] + w, i[E] = 0;
    }
    for (v = 0; v < p - 1; v++) {
      for (S = v, T = s[v], y = v + 1; y < p; y++)
        s[y] < T && (S = y, T = s[y]);
      if (S !== v)
        for (s[S] = s[v], s[v] = T, y = 0; y < p; y++)
          T = r.get(y, v), r.set(y, v, r.get(y, S)), r.set(y, S, T);
    }
  }
  function Sn(p, i, s, r) {
    let o = 0, u = p - 1, v, y, S, E, O, T, G;
    for (T = o + 1; T <= u - 1; T++) {
      for (G = 0, E = T; E <= u; E++)
        G = G + Math.abs(i.get(E, T - 1));
      if (G !== 0) {
        for (S = 0, E = u; E >= T; E--)
          s[E] = i.get(E, T - 1) / G, S += s[E] * s[E];
        for (y = Math.sqrt(S), s[T] > 0 && (y = -y), S = S - s[T] * y, s[T] = s[T] - y, O = T; O < p; O++) {
          for (v = 0, E = u; E >= T; E--)
            v += s[E] * i.get(E, O);
          for (v = v / S, E = T; E <= u; E++)
            i.set(E, O, i.get(E, O) - v * s[E]);
        }
        for (E = 0; E <= u; E++) {
          for (v = 0, O = u; O >= T; O--)
            v += s[O] * i.get(E, O);
          for (v = v / S, O = T; O <= u; O++)
            i.set(E, O, i.get(E, O) - v * s[O]);
        }
        s[T] = G * s[T], i.set(T, T - 1, G * y);
      }
    }
    for (E = 0; E < p; E++)
      for (O = 0; O < p; O++)
        r.set(E, O, E === O ? 1 : 0);
    for (T = u - 1; T >= o + 1; T--)
      if (i.get(T, T - 1) !== 0) {
        for (E = T + 1; E <= u; E++)
          s[E] = i.get(E, T - 1);
        for (O = T; O <= u; O++) {
          for (y = 0, E = T; E <= u; E++)
            y += s[E] * r.get(E, O);
          for (y = y / s[T] / i.get(T, T - 1), E = T; E <= u; E++)
            r.set(E, O, r.get(E, O) + y * s[E]);
        }
      }
  }
  function kn(p, i, s, r, o) {
    let u = p - 1, v = 0, y = p - 1, S = Number.EPSILON, E = 0, O = 0, T = 0, G = 0, K = 0, j = 0, U = 0, se = 0, C, H, le, w, x, N, M, I, V, L, q, Y, J, Ne, Ee;
    for (C = 0; C < p; C++)
      for ((C < v || C > y) && (s[C] = o.get(C, C), i[C] = 0), H = Math.max(C - 1, 0); H < p; H++)
        O = O + Math.abs(o.get(C, H));
    for (; u >= v; ) {
      for (w = u; w > v && (j = Math.abs(o.get(w - 1, w - 1)) + Math.abs(o.get(w, w)), j === 0 && (j = O), !(Math.abs(o.get(w, w - 1)) < S * j)); )
        w--;
      if (w === u)
        o.set(u, u, o.get(u, u) + E), s[u] = o.get(u, u), i[u] = 0, u--, se = 0;
      else if (w === u - 1) {
        if (M = o.get(u, u - 1) * o.get(u - 1, u), T = (o.get(u - 1, u - 1) - o.get(u, u)) / 2, G = T * T + M, U = Math.sqrt(Math.abs(G)), o.set(u, u, o.get(u, u) + E), o.set(u - 1, u - 1, o.get(u - 1, u - 1) + E), I = o.get(u, u), G >= 0) {
          for (U = T >= 0 ? T + U : T - U, s[u - 1] = I + U, s[u] = s[u - 1], U !== 0 && (s[u] = I - M / U), i[u - 1] = 0, i[u] = 0, I = o.get(u, u - 1), j = Math.abs(I) + Math.abs(U), T = I / j, G = U / j, K = Math.sqrt(T * T + G * G), T = T / K, G = G / K, H = u - 1; H < p; H++)
            U = o.get(u - 1, H), o.set(u - 1, H, G * U + T * o.get(u, H)), o.set(u, H, G * o.get(u, H) - T * U);
          for (C = 0; C <= u; C++)
            U = o.get(C, u - 1), o.set(C, u - 1, G * U + T * o.get(C, u)), o.set(C, u, G * o.get(C, u) - T * U);
          for (C = v; C <= y; C++)
            U = r.get(C, u - 1), r.set(C, u - 1, G * U + T * r.get(C, u)), r.set(C, u, G * r.get(C, u) - T * U);
        } else
          s[u - 1] = I + T, s[u] = I + T, i[u - 1] = U, i[u] = -U;
        u = u - 2, se = 0;
      } else {
        if (I = o.get(u, u), V = 0, M = 0, w < u && (V = o.get(u - 1, u - 1), M = o.get(u, u - 1) * o.get(u - 1, u)), se === 10) {
          for (E += I, C = v; C <= u; C++)
            o.set(C, C, o.get(C, C) - I);
          j = Math.abs(o.get(u, u - 1)) + Math.abs(o.get(u - 1, u - 2)), I = V = 0.75 * j, M = -0.4375 * j * j;
        }
        if (se === 30 && (j = (V - I) / 2, j = j * j + M, j > 0)) {
          for (j = Math.sqrt(j), V < I && (j = -j), j = I - M / ((V - I) / 2 + j), C = v; C <= u; C++)
            o.set(C, C, o.get(C, C) - j);
          E += j, I = V = M = 0.964;
        }
        for (se = se + 1, x = u - 2; x >= w && (U = o.get(x, x), K = I - U, j = V - U, T = (K * j - M) / o.get(x + 1, x) + o.get(x, x + 1), G = o.get(x + 1, x + 1) - U - K - j, K = o.get(x + 2, x + 1), j = Math.abs(T) + Math.abs(G) + Math.abs(K), T = T / j, G = G / j, K = K / j, !(x === w || Math.abs(o.get(x, x - 1)) * (Math.abs(G) + Math.abs(K)) < S * (Math.abs(T) * (Math.abs(o.get(x - 1, x - 1)) + Math.abs(U) + Math.abs(o.get(x + 1, x + 1)))))); )
          x--;
        for (C = x + 2; C <= u; C++)
          o.set(C, C - 2, 0), C > x + 2 && o.set(C, C - 3, 0);
        for (le = x; le <= u - 1 && (Ne = le !== u - 1, le !== x && (T = o.get(le, le - 1), G = o.get(le + 1, le - 1), K = Ne ? o.get(le + 2, le - 1) : 0, I = Math.abs(T) + Math.abs(G) + Math.abs(K), I !== 0 && (T = T / I, G = G / I, K = K / I)), I !== 0); le++)
          if (j = Math.sqrt(T * T + G * G + K * K), T < 0 && (j = -j), j !== 0) {
            for (le !== x ? o.set(le, le - 1, -j * I) : w !== x && o.set(le, le - 1, -o.get(le, le - 1)), T = T + j, I = T / j, V = G / j, U = K / j, G = G / T, K = K / T, H = le; H < p; H++)
              T = o.get(le, H) + G * o.get(le + 1, H), Ne && (T = T + K * o.get(le + 2, H), o.set(le + 2, H, o.get(le + 2, H) - T * U)), o.set(le, H, o.get(le, H) - T * I), o.set(le + 1, H, o.get(le + 1, H) - T * V);
            for (C = 0; C <= Math.min(u, le + 3); C++)
              T = I * o.get(C, le) + V * o.get(C, le + 1), Ne && (T = T + U * o.get(C, le + 2), o.set(C, le + 2, o.get(C, le + 2) - T * K)), o.set(C, le, o.get(C, le) - T), o.set(C, le + 1, o.get(C, le + 1) - T * G);
            for (C = v; C <= y; C++)
              T = I * r.get(C, le) + V * r.get(C, le + 1), Ne && (T = T + U * r.get(C, le + 2), r.set(C, le + 2, r.get(C, le + 2) - T * K)), r.set(C, le, r.get(C, le) - T), r.set(C, le + 1, r.get(C, le + 1) - T * G);
          }
      }
    }
    if (O !== 0) {
      for (u = p - 1; u >= 0; u--)
        if (T = s[u], G = i[u], G === 0)
          for (w = u, o.set(u, u, 1), C = u - 1; C >= 0; C--) {
            for (M = o.get(C, C) - T, K = 0, H = w; H <= u; H++)
              K = K + o.get(C, H) * o.get(H, u);
            if (i[C] < 0)
              U = M, j = K;
            else if (w = C, i[C] === 0 ? o.set(C, u, M !== 0 ? -K / M : -K / (S * O)) : (I = o.get(C, C + 1), V = o.get(C + 1, C), G = (s[C] - T) * (s[C] - T) + i[C] * i[C], N = (I * j - U * K) / G, o.set(C, u, N), o.set(
              C + 1,
              u,
              Math.abs(I) > Math.abs(U) ? (-K - M * N) / I : (-j - V * N) / U
            )), N = Math.abs(o.get(C, u)), S * N * N > 1)
              for (H = C; H <= u; H++)
                o.set(H, u, o.get(H, u) / N);
          }
        else if (G < 0)
          for (w = u - 1, Math.abs(o.get(u, u - 1)) > Math.abs(o.get(u - 1, u)) ? (o.set(u - 1, u - 1, G / o.get(u, u - 1)), o.set(u - 1, u, -(o.get(u, u) - T) / o.get(u, u - 1))) : (Ee = Gt(0, -o.get(u - 1, u), o.get(u - 1, u - 1) - T, G), o.set(u - 1, u - 1, Ee[0]), o.set(u - 1, u, Ee[1])), o.set(u, u - 1, 0), o.set(u, u, 1), C = u - 2; C >= 0; C--) {
            for (L = 0, q = 0, H = w; H <= u; H++)
              L = L + o.get(C, H) * o.get(H, u - 1), q = q + o.get(C, H) * o.get(H, u);
            if (M = o.get(C, C) - T, i[C] < 0)
              U = M, K = L, j = q;
            else if (w = C, i[C] === 0 ? (Ee = Gt(-L, -q, M, G), o.set(C, u - 1, Ee[0]), o.set(C, u, Ee[1])) : (I = o.get(C, C + 1), V = o.get(C + 1, C), Y = (s[C] - T) * (s[C] - T) + i[C] * i[C] - G * G, J = (s[C] - T) * 2 * G, Y === 0 && J === 0 && (Y = S * O * (Math.abs(M) + Math.abs(G) + Math.abs(I) + Math.abs(V) + Math.abs(U))), Ee = Gt(
              I * K - U * L + G * q,
              I * j - U * q - G * L,
              Y,
              J
            ), o.set(C, u - 1, Ee[0]), o.set(C, u, Ee[1]), Math.abs(I) > Math.abs(U) + Math.abs(G) ? (o.set(
              C + 1,
              u - 1,
              (-L - M * o.get(C, u - 1) + G * o.get(C, u)) / I
            ), o.set(
              C + 1,
              u,
              (-q - M * o.get(C, u) - G * o.get(C, u - 1)) / I
            )) : (Ee = Gt(
              -K - V * o.get(C, u - 1),
              -j - V * o.get(C, u),
              U,
              G
            ), o.set(C + 1, u - 1, Ee[0]), o.set(C + 1, u, Ee[1]))), N = Math.max(Math.abs(o.get(C, u - 1)), Math.abs(o.get(C, u))), S * N * N > 1)
              for (H = C; H <= u; H++)
                o.set(H, u - 1, o.get(H, u - 1) / N), o.set(H, u, o.get(H, u) / N);
          }
      for (C = 0; C < p; C++)
        if (C < v || C > y)
          for (H = C; H < p; H++)
            r.set(C, H, o.get(C, H));
      for (H = p - 1; H >= v; H--)
        for (C = v; C <= y; C++) {
          for (U = 0, le = v; le <= Math.min(H, y); le++)
            U = U + r.get(C, le) * o.get(le, H);
          r.set(C, H, U);
        }
    }
  }
  function Gt(p, i, s, r) {
    let o, u;
    return Math.abs(s) > Math.abs(r) ? (o = r / s, u = s + o * r, [(p + o * i) / u, (i - o * p) / u]) : (o = s / r, u = r + o * s, [(o * p + i) / u, (o * i - p) / u]);
  }
  class Kt {
    constructor(i) {
      if (i = De.checkMatrix(i), !i.isSymmetric())
        throw new Error("Matrix is not symmetric");
      let s = i, r = s.rows, o = new Q(r, r), u = !0, v, y, S;
      for (y = 0; y < r; y++) {
        let E = 0;
        for (S = 0; S < y; S++) {
          let O = 0;
          for (v = 0; v < S; v++)
            O += o.get(S, v) * o.get(y, v);
          O = (s.get(y, S) - O) / o.get(S, S), o.set(y, S, O), E = E + O * O;
        }
        for (E = s.get(y, y) - E, u &&= E > 0, o.set(y, y, Math.sqrt(Math.max(E, 0))), S = y + 1; S < r; S++)
          o.set(y, S, 0);
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
      let o = i.columns, u = i.clone(), v, y, S;
      for (S = 0; S < r; S++)
        for (y = 0; y < o; y++) {
          for (v = 0; v < S; v++)
            u.set(S, y, u.get(S, y) - u.get(v, y) * s.get(S, v));
          u.set(S, y, u.get(S, y) / s.get(S, S));
        }
      for (S = r - 1; S >= 0; S--)
        for (y = 0; y < o; y++) {
          for (v = S + 1; v < r; v++)
            u.set(S, y, u.get(S, y) - u.get(v, y) * s.get(v, S));
          u.set(S, y, u.get(S, y) / s.get(S, S));
        }
      return u;
    }
    get lowerTriangularMatrix() {
      return this.L;
    }
  }
  class Ht {
    constructor(i, s = {}) {
      i = De.checkMatrix(i);
      let { Y: r } = s;
      const {
        scaleScores: o = !1,
        maxIterations: u = 1e3,
        terminationCriteria: v = 1e-10
      } = s;
      let y;
      if (r) {
        if (e.isAnyArray(r) && typeof r[0] == "number" ? r = Q.columnVector(r) : r = De.checkMatrix(r), r.rows !== i.rows)
          throw new Error("Y should have the same number of rows as X");
        y = r.getColumnVector(0);
      } else
        y = i.getColumnVector(0);
      let S = 1, E, O, T, G;
      for (let K = 0; K < u && S > v; K++)
        T = i.transpose().mmul(y).div(y.transpose().mmul(y).get(0, 0)), T = T.div(T.norm()), E = i.mmul(T).div(T.transpose().mmul(T).get(0, 0)), K > 0 && (S = E.clone().sub(G).pow(2).sum()), G = E.clone(), r ? (O = r.transpose().mmul(E).div(E.transpose().mmul(E).get(0, 0)), O = O.div(O.norm()), y = r.mmul(O).div(O.transpose().mmul(O).get(0, 0))) : y = E;
      if (r) {
        let K = i.transpose().mmul(E).div(E.transpose().mmul(E).get(0, 0));
        K = K.div(K.norm());
        let j = i.clone().sub(E.clone().mmul(K.transpose())), U = y.transpose().mmul(E).div(E.transpose().mmul(E).get(0, 0)), se = r.clone().sub(
          E.clone().mulS(U.get(0, 0)).mmul(O.transpose())
        );
        this.t = E, this.p = K.transpose(), this.w = T.transpose(), this.q = O, this.u = y, this.s = E.transpose().mmul(E), this.xResidual = j, this.yResidual = se, this.betas = U;
      } else
        this.w = T.transpose(), this.s = E.transpose().mmul(E).sqrt(), o ? this.t = E.clone().div(this.s.get(0, 0)) : this.t = E, this.xResidual = i.sub(E.mmul(T.transpose()));
    }
  }
  return we.AbstractMatrix = ie, we.CHO = Kt, we.CholeskyDecomposition = Kt, we.DistanceMatrix = Le, we.EVD = Zt, we.EigenvalueDecomposition = Zt, we.LU = It, we.LuDecomposition = It, we.Matrix = Q, we.MatrixColumnSelectionView = ct, we.MatrixColumnView = Oe, we.MatrixFlipColumnView = ft, we.MatrixFlipRowView = Tt, we.MatrixRowSelectionView = yn, we.MatrixRowView = Rt, we.MatrixSelectionView = Ct, we.MatrixSubView = tr, we.MatrixTransposeView = nr, we.NIPALS = Ht, we.Nipals = Ht, we.QR = Jt, we.QrDecomposition = Jt, we.SVD = xt, we.SingularValueDecomposition = xt, we.SymmetricMatrix = Me, we.WrapperMatrix1D = Ae, we.WrapperMatrix2D = De, we.correlation = or, we.covariance = sr, we.default = Q, we.determinant = Dt, we.inverse = Pe, we.linearDependencies = ir, we.pseudoInverse = xn, we.solve = bn, we.wrap = vn, we;
}
var os = /* @__PURE__ */ tc();
const mi = /* @__PURE__ */ is(os), nt = mi.Matrix ? mi.Matrix : os.Matrix;
var Dn = { exports: {} }, nc = Dn.exports, wi;
function rc() {
  return wi || (wi = 1, (function(e, t) {
    (function(n, l) {
      e.exports = l();
    })(nc, function() {
      function n(c) {
        c = c.replace(/,/g, " ").replace(/([^eE])-/g, "$1 -").replace(/\s*([achlmqstvzACHLMQSTVZ])\s*/g, " $1 ").replace(/\s+/g, " ").replace(/(\d*\.\d+([eE]-?\d+)?)((\.\d+)+)/g, (W, oe, ue, fe) => oe + fe.replaceAll(".", " ."));
        var f = c.replace(/([achlmqstvzACHLMQSTVZ])\s?/g, "|$1").split("|"), d = f.length, m, g, b, _, R, z = [], F = [], $, k, B = 0, Z = 0, P = 0, D = 0, te = 0, ne = 0, he = 0, ge = 0, re = 0, de = 0, ye = 0, ae = 0, A = 0, ee = "";
        for (m = 1; m < d; m++) {
          if (g = f[m], b = g.substring(0, 1), _ = b.toLowerCase(), z = g.replace(b, "").trim().split(" ").filter(function(W) {
            return W !== "";
          }), F = z, z = z.map(parseFloat), $ = z.length, _ === "m") {
            if (ee += "M ", b === "m" ? (P += z[0], D += z[1]) : (P = z[0], D = z[1]), B = P, Z = D, ee += P + " " + D + " ", $ > 2)
              for (k = 0; k < $; k += 2)
                b === "m" ? (P += z[k], D += z[k + 1]) : (P = z[k], D = z[k + 1]), ee += "L " + P + " " + D + " ";
          } else if (_ === "l")
            for (k = 0; k < $; k += 2)
              b === "l" ? (P += z[k], D += z[k + 1]) : (P = z[k], D = z[k + 1]), ee += "L " + P + " " + D + " ";
          else if (_ === "h")
            for (k = 0; k < $; k++)
              b === "h" ? P += z[k] : P = z[k], ee += "L " + P + " " + D + " ";
          else if (_ === "v")
            for (k = 0; k < $; k++)
              b === "v" ? D += z[k] : D = z[k], ee += "L " + P + " " + D + " ";
          else if (_ === "q")
            for (k = 0; k < $; k += 4)
              b === "q" ? (te = P + z[k], ne = D + z[k + 1], P += z[k + 2], D += z[k + 3]) : (te = z[k], ne = z[k + 1], P = z[k + 2], D = z[k + 3]), ee += "Q " + te + " " + ne + " " + P + " " + D + " ";
          else if (_ === "t")
            for (k = 0; k < $; k += 2)
              ["t", "q"].indexOf(R) > -1 ? (te = P + (P - te), ne = D + (D - ne)) : (te = P, ne = D), b === "t" ? (P += z[k], D += z[k + 1]) : (P = z[k], D = z[k + 1]), ee += "Q " + te + " " + ne + " " + P + " " + D + " ", R = _;
          else if (_ === "c")
            for (k = 0; k < $; k += 6)
              b === "c" ? (te = P + z[k], ne = D + z[k + 1], he = P + z[k + 2], ge = D + z[k + 3], P += z[k + 4], D += z[k + 5]) : (te = z[k], ne = z[k + 1], he = z[k + 2], ge = z[k + 3], P = z[k + 4], D = z[k + 5]), ee += "C " + te + " " + ne + " " + he + " " + ge + " " + P + " " + D + " ";
          else if (_ === "s")
            for (k = 0; k < $; k += 4)
              te = P, ne = D, ["s", "c"].indexOf(R) > -1 && (te += P - he, ne += D - ge), b === "s" ? (he = P + z[k], ge = D + z[k + 1], P += z[k + 2], D += z[k + 3]) : (he = z[k], ge = z[k + 1], P = z[k + 2], D = z[k + 3]), ee += "C " + te + " " + ne + " " + he + " " + ge + " " + P + " " + D + " ";
          else if (_ === "a")
            for (k = 0; k < $; k += 7) {
              re = z[k], de = z[k + 1], ye = z[k + 2], ae = F[k + 3];
              let W = !1;
              if (ae.length > 1) {
                let oe = parseInt(ae[0]), ue = parseInt(ae[1]), fe;
                ae.length > 2 && (fe = parseFloat(ae.substring(2))), z[k + 3] = oe, z.splice(k + 4, 0, ue), F.splice(k + 4, 0, "+"), fe !== void 0 && z.splice(k + 5, 0, fe), W = !0;
              }
              ae = z[k + 3], A = W ? z[k + 4] : F[k + 4], !W && A.length > 1 && (z[k + 4] = parseInt(A[0]), z.splice(k + 5, 0, parseFloat(A.substring(1)))), A = z[k + 4], b === "a" ? (P += z[k + 5], D += z[k + 6]) : (P = z[k + 5], D = z[k + 6]), ee += "A " + re + " " + de + " " + ye + " " + ae + " " + A + " " + P + " " + D + " ";
            }
          else _ === "z" && (ee += "Z ", P = B, D = Z);
          R = _;
        }
        return ee.trim();
      }
      function l(c) {
        var f = c.trim().split(" "), d, m = f.length, g = m - 1, b, _ = [], R, z, F, $, k, B = new RegExp("[QAZLCM]", ""), Z = f.slice(-1)[0].toUpperCase() === "Z";
        for (b = 0; b < m; b++)
          if (d = f[b], B.test(d)) {
            if (d === "A") {
              _.push(f[b + 5] === "0" ? "1" : "0"), _.push(f[b + 4]), _.push(f[b + 3]), _.push(f[b + 2]), _.push(f[b + 1]), _.push(d), _.push(f[b + 7]), _.push(f[b + 6]), b += 7;
              continue;
            } else if (d === "C")
              $ = 3, k = 2;
            else if (d === "Q")
              $ = 2, k = 1;
            else if (d === "L")
              $ = 1, k = 1;
            else if (d === "M")
              $ = 1, k = 0;
            else
              continue;
            for ($ === k && _.push(d), F = 0; F < $; F++)
              F === k && _.push(d), R = f[++b], z = f[++b], _.push(z), _.push(R);
          } else {
            var P = f.slice(Math.max(b - 3, 0), 3).join(" ");
            throw post = f.slice(b + 1, Math.min(b + 4, g)).join(" "), range = P + " [" + d + "] " + post, "Error while trying to reverse normalized SVG path, at position " + b + " (" + range + `).
Either the path is not normalised, or it's malformed.`;
          }
        _.push("M");
        var D = "", te = _.length - 1, ne;
        for (ne = te; ne > 0; ne--)
          D += _[ne] + " ";
        return Z && (D += "Z"), D = D.replace(/M M/g, "Z M"), D;
      }
      function a(d, f) {
        f = parseInt(f) == f ? f : !1;
        var d = n(d), m = d.replace(/M/g, "|M").split("|"), g;
        if (m.splice(0, 1), f !== !1 && f >= m.length)
          return d;
        if (f === !1)
          m = m.map(function(_) {
            return l(_.trim());
          });
        else {
          var b = m[f];
          b && (g = l(b.trim()), m[f] = g);
        }
        return m.reverse().join(" ").replace(/ +/g, " ").trim();
      }
      var h = {
        normalize: n,
        reverseNormalized: l,
        reverse: a
      };
      return h;
    });
  })(Dn)), Dn.exports;
}
var ic = rc();
const yi = /* @__PURE__ */ is(ic);
function sc(e, t, n, l) {
  switch (e.pathType) {
    case tt.REFLEXIVE:
      return ls(e.source, [t / 2, n / 2], l);
    case tt.ARC:
      return Nr(e.source, e.target, l);
    case tt.ARCREVERSE:
      return yi.reverse(Nr(e.source, e.target, l));
    case tt.LINE:
      return ln(e.source, e.target, l);
    case tt.LINEREVERSE:
      return yi.reverse(ln(e.source, e.target, l));
    default:
      return "";
  }
}
function oc(e, t, n) {
  return e.id === t.id ? tt.REFLEXIVE : n.hasBidirectionalConnection(e, t) ? vi(e, t) ? tt.ARCREVERSE : tt.ARC : vi(e, t) ? tt.LINEREVERSE : tt.LINE;
}
function ln(e, t, n) {
  const l = { x: t.x - e.x, y: t.y - e.y };
  let a = Math.sqrt(l.x * l.x + l.y * l.y);
  a === 0 && (a = Number.EPSILON);
  const h = l.x / a, c = l.y / a, f = lc(e, t, n, h, c);
  return `M${f.start.x},${f.start.y}
          L${f.end.x},${f.end.y}`;
}
function lc(e, t, n, l, a) {
  let h, c;
  return e.props.shape === ce.CIRCLE ? h = {
    x: e.x + (e.renderedSize.radius - 1) * l,
    y: e.y + (e.renderedSize.radius - 1) * a
  } : e.props.shape === ce.RECTANGLE && (h = Zn(
    e.x,
    e.y,
    e.renderedSize.width,
    e.renderedSize.height,
    l,
    a,
    2
  )), t instanceof Jn ? c = t.props.shape === ce.CIRCLE ? {
    x: t.x - (t.renderedSize.radius + n.markerPadding) * l,
    y: t.y - (t.renderedSize.radius + n.markerPadding) * a
  } : Zn(
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
function Nr(e, t, n) {
  const l = new nt([[e.x, e.y]]), a = new nt([[t.x, t.y]]), h = nt.subtract(a, l), c = h.norm("frobenius"), f = h.divide(c);
  let d = e.props.shape === ce.CIRCLE ? Ut(10) : Ut(30), m = t.props.shape === ce.CIRCLE ? Ut(10) : Ut(30), g = 1.2 * c;
  const b = ac(e, t, n, l, a, f, {
    start: d,
    end: m
  });
  return `M${b.start.get(0, 0)},${b.start.get(0, 1)}
          A${g},${g},0,0,1,${b.end.get(0, 0)},${b.end.get(0, 1)}`;
}
function ac(e, t, n, l, a, h, c) {
  let f, d;
  if (e.props.shape === ce.CIRCLE)
    f = Ve(h, -c.start).multiply(e.renderedSize.radius - 1).add(l);
  else if (e.props.shape === ce.RECTANGLE) {
    const m = Zn(
      e.x,
      e.y,
      e.renderedSize.width,
      e.renderedSize.height,
      h.get(0, 0),
      h.get(0, 1),
      2
    );
    f = Ve(h, -c.start).add([[m.x, m.y]]);
  }
  if (t.props.shape === ce.CIRCLE) {
    const m = nt.multiply(h, -1);
    d = Ve(m, c.end).multiply(t.renderedSize.radius).add(a).add(Ve(m, c.end).multiply(2 * n.markerBoxSize));
  } else if (t.props.shape === ce.RECTANGLE) {
    const m = Zn(
      t.x,
      t.y,
      t.renderedSize.width,
      t.renderedSize.height,
      -h.get(0, 0),
      -h.get(0, 1)
    ), g = nt.multiply(h, -1);
    d = Ve(g, c.end).add([[m.x, m.y]]).add(Ve(g, c.end).multiply(2 * n.markerBoxSize));
  }
  return { start: f, end: d };
}
function ls(e, t, n) {
  const l = new nt([t]);
  if (e.props.shape === ce.CIRCLE) {
    const a = new nt([[e.x, e.y]]);
    a.get(0, 0) === l.get(0, 0) && a.get(0, 1) === l.get(0, 1) && l.add([[0, 1]]);
    const h = nt.subtract(a, l), c = h.divide(h.norm("frobenius")), f = Ut(40), d = Ve(c, f).multiply(e.renderedSize.radius - 1).add(a), m = Ve(c, -f).multiply(e.renderedSize.radius).add(a).add(Ve(c, -f).multiply(2 * n.markerBoxSize));
    return `M${d.get(0, 0)},${d.get(0, 1)}
              A${e.renderedSize.radius},${e.renderedSize.radius},0,1,0,${m.get(0, 0)},${m.get(0, 1)}`;
  } else return e.props.shape === ce.RECTANGLE ? e.props.reflexiveEdgeStart == "MOVABLE" ? uc(e, n, l) : hc(e, n) : "";
}
function vi(e, t) {
  return e.x > t.x;
}
function uc(e, t, n) {
  if (e.props.shape === ce.RECTANGLE) {
    const l = new nt([[e.x, e.y]]);
    l.get(0, 0) === n.get(0, 0) && l.get(0, 1) === n.get(0, 1) && n.add([[0, 1]]);
    const a = nt.subtract(l, n), h = a.divide(a.norm("frobenius")), c = Ut(45);
    let f, d, m = 0.5 * e.renderedSize.width, g = 0.5 * e.renderedSize.height;
    const b = cc(
      a.get(0, 0),
      a.get(0, 1),
      30
    );
    if (b === _e.BOTTOMLEFT || b === _e.BOTTOMRIGHT || b === _e.TOPLEFT || b === _e.TOPRIGHT) {
      let _ = as(b, e, t);
      f = _.start, d = _.end, e.renderedSize.width > e.renderedSize.height ? (b === _e.TOPLEFT || b === _e.BOTTOMRIGHT) && (m = 0.25 * e.renderedSize.width) : e.renderedSize.height > e.renderedSize.width && (b === _e.TOPRIGHT || b === _e.BOTTOMLEFT) && (g = 0.25 * e.renderedSize.height);
    } else b === _e.LEFT || b === _e.RIGHT ? (f = Ve(h, c).multiply(0.5 * e.renderedSize.width - 1).add(l), d = Ve(h, -c).multiply(0.5 * e.renderedSize.height - 1).add(l).add(Ve(h, -c).multiply(2 * t.markerBoxSize))) : (f = Ve(h, c).multiply(0.5 * e.renderedSize.height - 1).add(l), d = Ve(h, -c).multiply(0.5 * e.renderedSize.width - 1).add(l).add(Ve(h, -c).multiply(2 * t.markerBoxSize)));
    return `M${f.get(0, 0)},${f.get(0, 1)} A${m},${g}, 0, 1, 0, ${d.get(0, 0)},${d.get(0, 1)}`;
  } else
    return "";
}
function hc(e, t) {
  if (e.props.shape === ce.RECTANGLE && e.props.reflexiveEdgeStart !== "MOVABLE") {
    let n, l, a = 0.5 * e.renderedSize.width, h = 0.5 * e.renderedSize.height;
    e.renderedSize.width > e.renderedSize.height ? (e.props.reflexiveEdgeStart === _e.TOPLEFT || e.props.reflexiveEdgeStart === _e.BOTTOMRIGHT) && (a = e.renderedSize.width / e.renderedSize.height + e.renderedSize.height) : e.renderedSize.height > e.renderedSize.width && (e.props.reflexiveEdgeStart === _e.TOPRIGHT || e.props.reflexiveEdgeStart === _e.BOTTOMLEFT) && (h = e.renderedSize.height / e.renderedSize.width + e.renderedSize.width);
    let c = as(
      e.props.reflexiveEdgeStart,
      e,
      t
    );
    return n = c.start, l = c.end, `M${n.get(0, 0)},${n.get(0, 1)} A${a},${h}, 0, 1, 0, ${l.get(0, 0)},${l.get(0, 1)}`;
  } else
    return "";
}
function Zn(e, t, n, l, a, h, c = 0) {
  const f = e - 0.5 * n, d = e + 0.5 * n, m = t - 0.5 * l, g = t + 0.5 * l;
  a === 0 && (a = Number.EPSILON), h === 0 && (h = Number.EPSILON);
  const b = a < 0 ? f : d, _ = h < 0 ? m : g, R = (b - e) / a, z = (_ - t) / h, F = Math.min(R, z);
  let $ = e + F * a, k = t + F * h;
  if (c !== 0)
    if (R < z) {
      let B;
      b === f ? B = 1 : B = -1, $ = $ + c * B;
    } else {
      let B;
      _ === m ? B = 1 : B = -1, k = k + c * B;
    }
  return { x: $, y: k };
}
function cc(e, t, n = 30) {
  let l = fc(Math.atan2(e, t));
  return l < 0 && (l += 360), $t(l, 0, n) ? _e.BOTTOMLEFT : $t(l, [0, 90], -n) ? _e.BOTTOM : $t(l, 90, n) ? _e.BOTTOMRIGHT : $t(l, [90, 180], -n) ? _e.RIGHT : $t(l, 180, n) ? _e.TOPRIGHT : $t(l, [180, 270], -n) ? _e.TOP : $t(l, 270, n) ? _e.TOPLEFT : _e.LEFT;
}
function as(e, t, n) {
  const l = t.x, a = t.y, h = 0.5 * t.renderedSize.width, c = 0.5 * t.renderedSize.height, f = n.markerBoxSize, d = {
    [_e.BOTTOMLEFT]: {
      start: [l - h + 2, a + c - 1],
      end: [l + h - 2 * f, a + c + 2 * f]
    },
    [_e.BOTTOM]: {
      start: [l, a + c - 1],
      end: [l + h + 2 * f, a]
    },
    [_e.BOTTOMRIGHT]: {
      start: [l + h - 2, a + c - 1],
      end: [l + h + 2 * f, a - c + 2 * f]
    },
    [_e.RIGHT]: {
      start: [l + h - 1, a],
      end: [l, a - c - 2 * f]
    },
    [_e.TOPRIGHT]: {
      start: [l + h - 2, a - c + 1],
      end: [l - h + 2 * f, a - c - 2 * f]
    },
    [_e.TOP]: {
      start: [l, a - c + 1],
      end: [l - h - 2 * f, a]
    },
    [_e.TOPLEFT]: {
      start: [l - h + 2, a - c + 1],
      end: [l - h - 2 * f, a + c - 2 * f]
    },
    [_e.LEFT]: {
      start: [l - h + 1, a],
      end: [l, a + c + 2 * f]
    }
  }, { start: m, end: g } = d[e];
  return {
    start: new nt([m]),
    end: new nt([g])
  };
}
function $t(e, t, n = 0) {
  e = (e + 360) % 360;
  let l, a;
  return typeof t == "number" ? (l = (t - n + 360) % 360, a = (t + n) % 360) : (l = (t[0] - n + 360) % 360, a = (t[1] + n) % 360), l < a ? e >= l && e <= a : e >= l || e <= a;
}
function Ut(e) {
  return e * (Math.PI / 180);
}
function fc(e) {
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
function dc(e) {
  const t = e.replace(/\r\n/g, `
`).split(`
`), n = t.findIndex((f) => f.trim().startsWith("#")), l = n !== -1 ? t.slice(0, n) : t, a = n !== -1 ? t.slice(n + 1) : [], h = [];
  if (l.length)
    for (const f of l) {
      let [, d, m, g] = (f.match(/(\w+) (.*) \/COLOR:\/(.+)/) || f.match(/(\w+) (.*)/) || f.match(/(\w+)/) || []).map((b) => b.trim());
      m?.includes("/COLOR:/") && (g = m, m = ""), d && h.push({
        idImported: d,
        label: m,
        color: g?.replace("/COLOR:/", "")
      });
    }
  const c = [];
  if (a.length)
    for (const f of a) {
      let [, d, m, g, b] = (f.match(/(\w+) (\w+) (.*) \/COLOR:\/(.+)/) || f.match(/(\w+) (\w+) (.*)/) || f.match(/(\w+) (\w+)/) || []).map((_) => _.trim());
      g?.includes("/COLOR:/") && (b = g, g = ""), d && m && c.push({
        sourceIdImported: d,
        targetIdImported: m,
        label: g,
        color: b?.replace("/COLOR:/", "")
      });
    }
  return [h, c];
}
function gc(e) {
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
const pc = {
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
}, us = {
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
}, Ie = {
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
    const d = X.map([t, n], (m) => {
      const g = c - X.getVersionPrecision(m), b = m + new Array(g + 1).join(".0");
      return X.map(b.split("."), (_) => new Array(20 - _.length).join("0") + _).reverse();
    });
    for (l && (f = c - Math.min(a, h)), c -= 1; c >= f; ) {
      if (d[0][c] > d[1][c])
        return 1;
      if (d[0][c] === d[1][c]) {
        if (c === f)
          return 0;
        c -= 1;
      } else if (d[0][c] < d[1][c])
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
      typeof c == "object" && c !== null && Object.keys(c).forEach((d) => {
        l[d] = c[d];
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
    return pc[t];
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
    return us[t] || "";
  }
}
const ke = /version\/(\d+(\.?_?\d+)+)/i, mc = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(e) {
      const t = {
        name: "Googlebot"
      }, n = X.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(e) {
      const t = {
        name: "Opera"
      }, n = X.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(e) {
      const t = {
        name: "Samsung Internet for Android"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Whale/i],
    describe(e) {
      const t = {
        name: "NAVER Whale Browser"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/PaleMoon/i],
    describe(e) {
      const t = {
        name: "Pale Moon"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(e) {
      const t = {
        name: "MZ Browser"
      }, n = X.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/focus/i],
    describe(e) {
      const t = {
        name: "Focus"
      }, n = X.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/swing/i],
    describe(e) {
      const t = {
        name: "Swing"
      }, n = X.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/coast/i],
    describe(e) {
      const t = {
        name: "Opera Coast"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(e) {
      const t = {
        name: "Opera Touch"
      }, n = X.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/yabrowser/i],
    describe(e) {
      const t = {
        name: "Yandex Browser"
      }, n = X.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(e) {
      const t = {
        name: "UC Browser"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(e) {
      const t = {
        name: "Maxthon"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/epiphany/i],
    describe(e) {
      const t = {
        name: "Epiphany"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/puffin/i],
    describe(e) {
      const t = {
        name: "Puffin"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/sleipnir/i],
    describe(e) {
      const t = {
        name: "Sleipnir"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/k-meleon/i],
    describe(e) {
      const t = {
        name: "K-Meleon"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/micromessenger/i],
    describe(e) {
      const t = {
        name: "WeChat"
      }, n = X.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(e) {
      const t = {
        name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
      }, n = X.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
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
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(e) {
      const t = {
        name: "WebOS Browser"
      }, n = X.getFirstMatch(ke, e) || X.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
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
      }, n = X.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  {
    test: [/qupzilla/i],
    describe(e) {
      const t = {
        name: "QupZilla"
      }, n = X.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
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
      }, n = X.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || X.getFirstMatch(ke, e);
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
      }, n = X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(e) {
      const t = {
        name: "PlayStation 4"
      }, n = X.getFirstMatch(ke, e);
      return n && (t.version = n), t;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(e) {
      const t = {
        name: "Safari"
      }, n = X.getFirstMatch(ke, e);
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
], wc = [
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
], yc = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: Ie.bot,
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(e) {
      const t = X.getFirstMatch(/(can-l01)/i, e) && "Nova", n = {
        type: Ie.mobile,
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
        type: Ie.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: Ie.tablet,
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
        type: Ie.tablet,
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
        type: Ie.tablet,
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
        type: Ie.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: Ie.tablet
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
        type: Ie.mobile,
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
        type: Ie.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Nokia */
  {
    test: [/Nokia/i],
    describe(e) {
      const t = X.getFirstMatch(/Nokia\s+([0-9]+(\.[0-9]+)?)/i, e), n = {
        type: Ie.mobile,
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
        type: Ie.mobile
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
        type: Ie.mobile,
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
        type: Ie.mobile
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
        type: Ie.mobile,
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
        type: Ie.tablet
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
        type: Ie.mobile
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
        type: Ie.desktop,
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
        type: Ie.desktop
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
        type: Ie.desktop
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
        type: Ie.tv
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
        type: Ie.tv
      };
    }
  }
], vc = [
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
class bi {
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
    const t = X.find(mc, (n) => {
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
    const t = X.find(wc, (n) => {
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
    const t = X.find(yc, (n) => {
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
    const t = X.find(vc, (n) => {
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
      const d = t[f];
      typeof d == "string" ? (a[f] = d, h += 1) : typeof d == "object" && (n[f] = d, l += 1);
    }), l > 0) {
      const f = Object.keys(n), d = X.find(f, (g) => this.isOS(g));
      if (d) {
        const g = this.satisfies(n[d]);
        if (g !== void 0)
          return g;
      }
      const m = X.find(
        f,
        (g) => this.isPlatform(g)
      );
      if (m) {
        const g = this.satisfies(n[m]);
        if (g !== void 0)
          return g;
      }
    }
    if (h > 0) {
      const f = Object.keys(a), d = X.find(f, (m) => this.isBrowser(m, !0));
      if (d !== void 0)
        return this.compareVersion(a[d]);
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
class bc {
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
    return new bi(t, n);
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
    return new bi(t).getResult();
  }
  static get BROWSER_MAP() {
    return us;
  }
  static get ENGINE_MAP() {
    return Nt;
  }
  static get OS_MAP() {
    return Ge;
  }
  static get PLATFORMS_MAP() {
    return Ie;
  }
}
const xc = /* @__PURE__ */ _i({
  __name: "GraphComponent",
  setup(e, { expose: t }) {
    const n = Dr(() => {
      const w = document.querySelectorAll("graph-component");
      let x;
      for (let N = 0; N < w.length; N++) {
        const M = w[N], I = be(M.shadowRoot);
        let V;
        if (I.empty() ? V = be(
          ".graph-controller__graph-host.uninitialised"
        ) : V = I.select(
          ".graph-controller__graph-host.uninitialised"
        ), !V.empty()) {
          V.classed("uninitialised", !1), x = V;
          break;
        }
      }
      return x === void 0 && (x = be(
        ".graph-controller__graph-host.uninitialised"
      ), x.classed("uninitialised", !1)), x;
    }), l = Dr(() => {
      let w = n.value.node().parentElement;
      w || (w = n.value.node().getRootNode().host);
      let x = w.getAttribute("id");
      return x || "gc";
    });
    vs(() => {
      Ct(), window.addEventListener("resize", H);
    }), bs(() => {
      window.removeEventListener("resize", H);
    });
    const h = bc.getParser(window.navigator.userAgent).getPlatformType(!0);
    let c = !1, f = { x: -1e5, y: -1e5 };
    const d = Gr(new di()), m = Gr(!1), g = _s(new fh());
    let b, _ = 400, R = 400, z, F, $, k, B, Z, P, D, te, ne = 0, he = 0, ge = 1, re, de, ye;
    t({
      setDefaults: ae,
      getGraph: A,
      setGraph: ee,
      printGraph: W,
      deleteElement: oe,
      setLabel: ue,
      setColor: fe,
      setNodeSize: pe,
      setNodeShape: me,
      setNodeProps: ie,
      setDeletable: Re,
      setLabelEditable: Se,
      setNodesLinkPermission: Q,
      setNodesFixedPosition: Me,
      setEditability: Le,
      toggleNodeLabels: ft,
      toggleLinkLabels: ct,
      toggleZoom: Tt,
      toggleNodePhysics: xe,
      toggleFixedLinkDistance: Oe,
      toggleNodeCreationViaGUI: Rt,
      toggleNodeAutoGrow: yn,
      resetView: C
    });
    function ae(w) {
      w.zoomEnabled !== void 0 && Tt(w.zoomEnabled), w.nodePhysicsEnabled !== void 0 && xe(w.nodePhysicsEnabled), w.fixedLinkDistanceEnabled !== void 0 && Oe(w.fixedLinkDistanceEnabled), w.showNodeLabels !== void 0 && ft(w.showNodeLabels), w.showLinkLabels !== void 0 && ct(w.showLinkLabels), w.nodeAutoGrowToLabelSize !== void 0 && yn(w.nodeAutoGrowToLabelSize), w.allowNodeCreationViaGUI !== void 0 && Rt(w.allowNodeCreationViaGUI), g.nodeProps = w.nodeProps ?? g.nodeProps, g.nodeGUIEditability = w.nodeGUIEditability ?? g.nodeGUIEditability, g.linkGUIEditability = w.linkGUIEditability ?? g.linkGUIEditability, Pe();
    }
    function A(w = "json", x = !0, N = !0, M = !0, I = !0) {
      if (w.toLowerCase() === "json")
        return JSON.parse(
          d.value.toJSON(
            x,
            g.showNodeLabels,
            g.showLinkLabels,
            N,
            M,
            M,
            I,
            I
          )
        );
      if (w.toLowerCase() === "tgf")
        return d.value.toTGF(g.showNodeLabels, g.showLinkLabels, !0, !0);
      console.error('Invalid format while using getGraph(). Please choose "JSON" or "TGF".');
    }
    function ee(w) {
      typeof w == "object" || typeof w == "string" ? j(w) : le();
    }
    function W(w = "json", x = !0, N = !0, M = !0, I = !0) {
      w.toLowerCase() === "json" ? console.log(
        d.value.toJSON(
          x,
          g.showNodeLabels,
          g.showLinkLabels,
          N,
          M,
          M,
          I,
          I
        )
      ) : console.log(d.value.toTGF(g.showNodeLabels, g.showLinkLabels));
    }
    function oe(w) {
      if (w !== void 0) {
        const [x, N] = lt(w);
        for (const M of x)
          B.filter((I) => I.id === M).each(function(I) {
            let V = d.value.removeNode(I);
            if (V !== void 0) {
              let [L, q] = V;
              In(L, n.value), q.forEach((Y) => {
                zt(Y, n.value);
              });
            }
          });
        for (const M of N)
          k.filter((I) => I.id === M).each(function(I) {
            let V = d.value.removeLink(I);
            V !== void 0 && zt(V, n.value);
          });
      } else
        B.each(function(x) {
          let N = d.value.removeNode(x);
          if (N !== void 0) {
            let [M, I] = N;
            In(M, n.value), I.forEach((V) => {
              zt(V, n.value);
            });
          }
        }), k.each(function(x) {
          let N = d.value.removeLink(x);
          N !== void 0 && zt(N, n.value);
        });
      m.value = d.value.nodes.length > 0, Pe();
    }
    function ue(w, x) {
      if (x !== void 0) {
        const [N, M] = lt(x);
        for (const I of N)
          B.filter((V) => V.id === I).each((V) => {
            E(V, w);
          });
        for (const I of M)
          k.filter((V) => V.id === I).each((V) => {
            E(V, w);
          });
      } else
        B.each((N) => {
          E(N, w);
        }), k.each((N) => {
          E(N, w);
        });
    }
    function fe(w, x) {
      if (x !== void 0) {
        const [N, M] = lt(x);
        se(M);
        for (const I of N)
          B.selectAll(".graph-controller__node").filter((V) => V.id === I).each((V) => V.color = w).style("fill", w);
        for (const I of M)
          k.selectAll(".graph-controller__link").filter((V) => V.id === I).each((V) => V.color = w).style("stroke", w);
      } else
        B.selectAll(".graph-controller__node").each((N) => N.color = w).style("fill", w), se(d.value.links.map((N) => N.id)), k.selectAll(".graph-controller__link").each((N) => N.color = w).style("stroke", w);
      Mr($, l.value, g, w), Pe();
    }
    function pe(w, x) {
      if (x !== void 0) {
        const [N] = lt(x);
        for (const M of N)
          B.filter((I) => I.id === M).each(function(I) {
            let V, L;
            g.nodeAutoGrowToLabelSize && (V = be(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof w == "number" ? (I.setSize(w, g), g.nodeAutoGrowToLabelSize && V ? L = V : L = { width: 0, height: 0 }, Ae(I, L)) : I.props.shape === ce.CIRCLE && Mt(["radius"], Object.keys(w), !0) ? (I.setSize(w, g), g.nodeAutoGrowToLabelSize && V ? L = V : L = { width: 0, height: 0 }, Ae(I, L)) : I.props.shape === ce.RECTANGLE && Mt(["width", "height"], Object.keys(w), !0) && (I.setSize(w, g), g.nodeAutoGrowToLabelSize && V ? L = V : L = { width: 0, height: 0 }, Ae(I, L));
          });
      } else
        B.each(function(N) {
          let M, I;
          g.nodeAutoGrowToLabelSize && (M = be(this).select("foreignObject").select("div").node().getBoundingClientRect()), typeof w == "number" ? (N.setSize(w, g), g.nodeAutoGrowToLabelSize && M ? I = M : I = { width: 0, height: 0 }, Ae(N, I)) : N.props.shape === ce.CIRCLE && Mt(["radius"], Object.keys(w), !1) ? (N.setSize(w, g), g.nodeAutoGrowToLabelSize && M ? I = M : I = { width: 0, height: 0 }, Ae(N, I)) : N.props.shape === ce.RECTANGLE && Mt(["width", "height"], Object.keys(w), !1) && (N.setSize(w, g), g.nodeAutoGrowToLabelSize && M ? I = M : I = { width: 0, height: 0 }, Ae(N, I));
        });
      Pe();
    }
    function me(w, x) {
      if (x !== void 0) {
        const [N] = lt(x);
        for (const M of N)
          B.filter((I) => I.id === M).each(function(I) {
            if (I.props.shape !== w) {
              let V, L;
              g.nodeAutoGrowToLabelSize && (V = be(this).select("foreignObject").select("div").node(), L = V.getBoundingClientRect()), I.setShape(w, g), g.nodeAutoGrowToLabelSize && L && Ae(I, L);
            }
          });
      } else
        B.each(function(N) {
          if (N.props.shape !== w) {
            let M, I;
            g.nodeAutoGrowToLabelSize && (M = be(this).select("foreignObject").select("div").node(), I = M.getBoundingClientRect()), N.setShape(w, g), g.nodeAutoGrowToLabelSize && I && Ae(N, I);
          }
        });
      Pe();
    }
    function ie(w, x) {
      if (Mt(["shape"], Object.keys(w), !1)) {
        let N;
        if (x !== void 0 ? [N] = lt(x) : N = void 0, w.shape === ce.CIRCLE) {
          const M = ["shape", "radius"];
          if (Mt(M, Object.keys(w), !0))
            if (N !== void 0)
              for (const I of N)
                B.filter((V) => V.id === I).each(function(V) {
                  V.props = w;
                  let L;
                  if (g.nodeAutoGrowToLabelSize) {
                    let q, Y;
                    q = be(this).select("foreignObject").select("div").node(), Y = q.getBoundingClientRect(), L = Y;
                  } else
                    L = { width: 0, height: 0 };
                  Ae(V, L);
                });
            else
              B.each(function(I) {
                I.props = w;
                let V;
                if (g.nodeAutoGrowToLabelSize) {
                  let L, q;
                  L = be(this).select("foreignObject").select("div").node(), q = L.getBoundingClientRect(), V = q;
                } else
                  V = { width: 0, height: 0 };
                Ae(I, V);
              });
          sn(M, Object.keys(w));
        } else if (w.shape === ce.RECTANGLE) {
          const M = [
            "shape",
            "width",
            "height",
            "cornerRadius",
            "reflexiveEdgeStart"
          ];
          if (Mt(M, Object.keys(w), !0)) {
            if (Object.values(_e).includes(w.reflexiveEdgeStart) || w.reflexiveEdgeStart === "MOVABLE")
              if (N !== void 0)
                for (const I of N)
                  B.filter((V) => V.id === I).each(function(V) {
                    V.props = w;
                    let L;
                    if (g.nodeAutoGrowToLabelSize) {
                      let q, Y;
                      q = be(this).select("foreignObject").select("div").node(), Y = q.getBoundingClientRect(), L = Y;
                    } else
                      L = { width: 0, height: 0 };
                    Ae(V, L);
                  });
              else
                B.each(function(I) {
                  I.props = w;
                  let V;
                  if (g.nodeAutoGrowToLabelSize) {
                    let L, q;
                    L = be(this).select("foreignObject").select("div").node(), q = L.getBoundingClientRect(), V = q;
                  } else
                    V = { width: 0, height: 0 };
                  Ae(I, V);
                });
          } else
            qt(
              "Invalid reflexiveEdgeStart Value",
              "Use RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT or MOVABLE."
            );
          sn(M, Object.keys(w));
        }
        Pe();
      } else
        qt(
          "Invalid NodeProps Object",
          `For circular nodes: {shape: NodeShape, radius: number}
For rectangular nodes: {shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
        );
    }
    function Re(w, x) {
      if (x !== void 0) {
        const [N, M] = lt(x);
        for (const I of N)
          B.filter((V) => V.id === I).each((V) => {
            V.deletable = w;
          });
        for (const I of M)
          k.filter((V) => V.id === I).each((V) => {
            V.deletable = w;
          });
      } else
        B.each((N) => {
          N.deletable = w;
        }), k.each((N) => {
          N.deletable = w;
        });
    }
    function Se(w, x) {
      if (x !== void 0) {
        const [N, M] = lt(x);
        for (const I of N)
          B.filter((V) => V.id === I).each((V) => {
            V.labelEditable = w;
          });
        for (const I of M)
          k.filter((V) => V.id === I).each((V) => {
            V.labelEditable = w;
          });
      } else
        B.each((N) => {
          N.labelEditable = w;
        }), k.each((N) => {
          N.labelEditable = w;
        });
    }
    function Q(w, x, N) {
      if (N !== void 0) {
        const [M] = lt(N);
        for (const I of M)
          B.filter((V) => V.id === I).each((V) => {
            V.allowIncomingLinks = w, V.allowOutgoingLinks = x;
          });
      } else
        B.each((M) => {
          M.allowIncomingLinks = w, M.allowOutgoingLinks = x;
        });
    }
    function Me(w, x) {
      if (x !== void 0) {
        const [N] = lt(x);
        for (const M of N)
          B.filter((I) => I.id === M).each((I) => {
            Pn(I, w);
          });
      } else
        B.each((N) => {
          Pn(N, w);
        });
    }
    function Le(w, x) {
      const N = [
        "fixedPosition",
        "deletable",
        "labelEditable",
        "allowIncomingLinks",
        "allowOutgoingLinks"
      ], M = ["deletable", "labelEditable"];
      if (x !== void 0) {
        const [I, V] = lt(x), L = I.length === 0;
        for (const q of I)
          B.filter((Y) => Y.id === q).each(function(Y) {
            Y.deletable = w.deletable ?? Y.deletable, Y.labelEditable = w.labelEditable ?? Y.labelEditable, "fixedPosition" in w && Pn(Y, w.fixedPosition), "allowIncomingLinks" in w && (Y.allowIncomingLinks = w.allowIncomingLinks ?? Y.allowIncomingLinks), "allowOutgoingLinks" in w && (Y.allowOutgoingLinks = w.allowOutgoingLinks ?? Y.allowOutgoingLinks);
          });
        for (const q of V)
          k.selectAll(".graph-controller__link").filter((Y) => Y.id === q).each(function(Y) {
            Y.deletable = w.deletable ?? Y.deletable, Y.labelEditable = w.labelEditable ?? Y.labelEditable;
          });
        sn(
          L ? M : N,
          Object.keys(w)
        );
      } else
        B.each(function(I) {
          I.deletable = w.deletable ?? I.deletable, I.labelEditable = w.labelEditable ?? I.labelEditable, "fixedPosition" in w && Pn(I, w.fixedPosition), "allowIncomingLinks" in w && (I.allowIncomingLinks = w.allowIncomingLinks ?? I.allowIncomingLinks), "allowOutgoingLinks" in w && (I.allowOutgoingLinks = w.allowOutgoingLinks ?? I.allowOutgoingLinks);
        }), k.selectAll(".graph-controller__link").each(function(I) {
          I.deletable = w.deletable ?? I.deletable, I.labelEditable = w.labelEditable ?? I.labelEditable;
        }), sn(N, Object.keys(w));
      Pe();
    }
    function xe(w) {
      g.nodePhysicsEnabled = w, ns(b, w, _, R);
    }
    function Oe(w) {
      g.fixedLinkDistanceEnabled = w, rs(b, d.value, g, w);
    }
    function ct(w) {
      g.showLinkLabels = w;
    }
    function ft(w) {
      g.showNodeLabels = w;
    }
    function Tt(w) {
      g.zoomEnabled = w, C();
    }
    function Rt(w) {
      g.allowNodeCreationViaGUI = w;
    }
    function yn(w) {
      g.nodeAutoGrowToLabelSize = w, w || (ye.disconnect(), B.each(function(x) {
        Ae(x, { width: 0, height: 0 });
      })), Pe();
    }
    function Ct() {
      _ = n.value.node().clientWidth, R = n.value.node().clientHeight, z = hh(
        (w) => De(w, g.zoomEnabled),
        g.zoomEnabled
      ), $ = bh(
        n.value,
        z,
        (w) => g.allowNodeCreationViaGUI ? Gt(w) : null,
        (w) => g.allowNodeCreationViaGUI ? En(w) : null,
        (w) => {
          g.allowNodeCreationViaGUI && It(
            { ...g.nodeProps },
            it(w, $.node())[0],
            it(w, $.node())[1]
          );
        }
      ), Mh($, l.value, g, d.value.getNonDefaultLinkColors()), Z = Nh($), k = xh($), B = Eh($), b = Uh(d.value, g, _, R, () => st()), F = vh(b, _, R, g), ye = tr(), Pe();
    }
    function tr() {
      return new ResizeObserver((w) => {
        let x = !1;
        for (let N of w) {
          const M = N;
          if (M && M.borderBoxSize[0] !== void 0) {
            const I = {
              width: M.borderBoxSize[0].inlineSize,
              height: M.borderBoxSize[0].blockSize
            }, L = be(M.target).datum();
            x = Ae(L, I);
          }
        }
        x && Pe();
      });
    }
    function nr() {
      n.value.node().querySelectorAll(
        ".graph-controller__node-label, .graph-controller__node-label-placeholder"
      ).forEach((x) => ye.observe(x));
    }
    function Ae(w, x) {
      let N = !1;
      const M = { ...w.renderedSize }, I = x.width > x.height ? x.width / 2 : x.height / 2, V = x.width, L = x.height;
      return w.renderedSize = { width: V, height: L, radius: I }, JSON.stringify(M) !== JSON.stringify(w.renderedSize) && (N = !0, yh(w, M, n.value)), N;
    }
    function De(w, x = !0) {
      x && (ne = w.transform.x, he = w.transform.y, ge = w.transform.k, $.attr("transform", `translate(${ne},${he})scale(${ge})`));
    }
    function vn(w, x, N, M, I = g.linkGUIEditability.deletable, V = g.linkGUIEditability.labelEditable) {
      let L = d.value.createLink(
        w.id,
        x.id,
        N,
        M,
        I,
        V
      );
      L !== void 0 && gh(L, n.value), Pe();
    }
    function It(w, x, N, M, I, V, L = g.nodeGUIEditability.fixedPosition, q = g.nodeGUIEditability.deletable, Y = g.nodeGUIEditability.labelEditable, J = g.nodeGUIEditability.allowIncomingLinks, Ne = g.nodeGUIEditability.allowOutgoingLinks) {
      let Ee = d.value.createNode(
        w,
        x ?? _ / 2,
        N ?? R / 2,
        M,
        I,
        V,
        L,
        q,
        Y,
        J,
        Ne
      );
      dh(Ee, n.value), jn(b, d.value, g), m.value = !0, Pe();
    }
    function st() {
      B.attr("transform", (w) => `translate(${w.x},${w.y})`), k.selectAll(".graph-controller__link, .graph-controller__link-click-box").attr("d", (w) => (Jt(w), sc(w, _, R, g))), xn();
    }
    function Jt(w) {
      let x = w.pathType;
      w.pathType = oc(w.source, w.target, d.value), x !== w.pathType && Pe();
    }
    function xt() {
      const w = P, x = be(
        n.value.node().querySelector(`#${l.value + "-node-" + w.id}`)
      ).classed("on-deletion");
      if (w !== void 0 && !x) {
        const N = D;
        N !== void 0 ? Z.attr("d", () => w.id === N.id ? ls(w, [_ / 2, R / 2], g) : d.value.hasBidirectionalConnection(w, N) ? ln(w, N, g) : Nr(w, N, g)) : te !== void 0 && Z.attr(
          "d",
          ln(w, { x: te[0], y: te[1] }, g)
        );
      }
    }
    function Pe(w = 0.5) {
      k = k.data(d.value.links, (x) => x.id).join((x) => {
        const N = x.append("g").classed("graph-controller__link-container", !0);
        return N.append("path").classed("graph-controller__link", !0).style("stroke", (M) => M.color ? M.color : "").attr("id", (M) => l.value + "-link-" + M.id), N.append("path").classed("graph-controller__link-click-box", !0).on("dblclick", (M) => {
          et(M);
        }).on("pointerout", (M) => p(M)).on("pointerdown", (M, I) => {
          mh(I, M.button, n.value), s(M, I);
        }).on("pointerup", (M, I) => {
          i(M, I);
        }), N.append("text").attr("class", (M) => `graph-controller__${M.pathType?.toLowerCase()}-path-text`).append("textPath").attr(
          "class",
          (M) => M.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
        ).attr("href", (M) => `#${l.value + "-link-" + M.id}`).text((M) => M.label ? M.label : "add label").on("click", (M, I) => {
          y(M, I);
        }).on("dblclick", (M) => {
          et(M);
        }), N.append("foreignObject").classed("graph-controller__link-label-mathjax-container", !0).attr("xmlns", "http://www.w3.org/2000/svg").attr("width", 1).attr("height", 1).html(
          (M) => `<div class='${M.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"}'>
                        </div>`
        ).on("click", (M, I) => {
          y(M, I);
        }).on("dblclick", (M) => {
          et(M);
        }), N;
      }), k.selectChild(".graph-controller__link").attr("marker-start", function(x) {
        if (x.pathType?.includes("REVERSE")) {
          let N = `url(#${l.value}-link-arrow-reverse`;
          return x.color && (N += "-" + dn(x.color)), N += ")", N;
        } else
          return null;
      }).attr("marker-end", function(x) {
        if (x.pathType?.includes("REVERSE"))
          return null;
        {
          let N = `url(#${l.value}-link-arrow`;
          return x.color && (N += "-" + dn(x.color)), N += ")", N;
        }
      }), k.selectChild("text").attr("class", (x) => `graph-controller__${x.pathType?.toLowerCase()}-path-text`).attr("dy", (x) => x.pathType === tt.REFLEXIVE ? 15 : x.pathType == tt.LINEREVERSE ? -10 : x.pathType?.includes("REVERSE") ? 20 : -10).selectChild("textPath").attr(
        "class",
        (x) => x.label ? "graph-controller__link-label" : "graph-controller__link-label-placeholder"
      ).classed("hidden", (x) => !g.showLinkLabels || !x.label && !x.labelEditable).classed("not-editable", (x) => !x.labelEditable).attr("startOffset", (x) => x.pathType?.includes("REVERSE") ? "46%" : "50%").text((x) => x.label ? x.label : "add label"), B = B.data(d.value.nodes, (x) => x.id).join(
        (x) => {
          const N = x.append("g").classed("graph-controller__node-container", !0).call(F).on("dblclick", (M) => {
            et(M);
          }).on("pointerenter", (M, I) => Kt(I)).on("pointerout", (M, I) => Ht(I)).on("pointerdown", (M, I) => {
            ph(I, M.button, n.value), f = { x: M.x, y: M.y }, sr(M, I);
          }).on("pointerup", (M, I) => {
            En(M, I);
          });
          return _n(N);
        },
        (x) => (x.each(function(N) {
          const M = be(this), I = M.selectChild(".graph-controller__node").node();
          bn(N, I) ? (Dt(I, M), jn(b, d.value, g)) : rr(M);
        }), x)
      ), B.selectChild("foreignObject").selectChild("div").attr(
        "class",
        (x) => x.label ? "graph-controller__node-label" : "graph-controller__node-label-placeholder"
      ).classed("controls-node-size", g.nodeAutoGrowToLabelSize).classed("hidden", (x) => !g.showNodeLabels || !x.label && !x.labelEditable).classed("not-editable", (x) => !x.labelEditable).text((x) => x.label ? x.label : "add label"), window.MathJax?.version && window.MathJax.typesetPromise().then(() => {
        ir();
      }), g.nodeAutoGrowToLabelSize && nr(), b.nodes(d.value.nodes), b.alpha(w).restart();
    }
    function bn(w, x) {
      return w.props.shape === ce.CIRCLE && x.tagName !== "circle" || w.props.shape === ce.RECTANGLE && x.tagName !== "rect";
    }
    function Dt(w, x) {
      g.nodeAutoGrowToLabelSize && ye.unobserve(
        x.select(
          ".graph-controller__node-label, .graph-controller__node-label-placeholder"
        ).node()
      ), w.remove(), x.selectChild(".graph-controller__node-label-container").remove(), _n(x);
    }
    function _n(w) {
      w.filter((N) => N.props.shape === ce.CIRCLE).append(ce.CIRCLE).classed("graph-controller__node", !0).attr("id", (N) => `${l.value + "-node-" + N.id}`).attr("r", (N) => N.renderedSize.radius).style("fill", (N) => N.color ? N.color : ""), w.filter((N) => N.props.shape === ce.RECTANGLE).append(ce.RECTANGLE).classed("graph-controller__node", !0).attr("id", (N) => `${l.value + "-node-" + N.id}`).attr("width", (N) => N.renderedSize.width).attr("height", (N) => N.renderedSize.height).attr("x", (N) => -0.5 * N.renderedSize.width).attr("y", (N) => -0.5 * N.renderedSize.height).attr("rx", (N) => N.props.cornerRadius).attr("ry", (N) => N.props.cornerRadius).style("fill", (N) => N.color ? N.color : "");
      const x = w.append("foreignObject").classed("graph-controller__node-label-container", !0).attr("xmlns", "http://www.w3.org/2000/svg");
      return x.filter((N) => N.props.shape === ce.CIRCLE).attr("width", (N) => 2 * N.renderedSize.radius).attr("height", (N) => 2 * N.renderedSize.radius).attr("x", (N) => -N.renderedSize.radius).attr("y", (N) => -N.renderedSize.radius), x.filter((N) => N.props.shape === ce.RECTANGLE).attr("width", (N) => N.renderedSize.width).attr("height", (N) => N.renderedSize.height).attr("x", (N) => -0.5 * N.renderedSize.width).attr("y", (N) => -0.5 * N.renderedSize.height), x.append("xhtml:div").on("click", (N, M) => {
        v(N, M);
      }).on("dblclick", (N) => {
        et(N);
      }).on("pointerenter", (N, M) => Kt(M)).on("pointerout", (N, M) => Ht(M)), w;
    }
    function rr(w) {
      w.selectChild(".graph-controller__node").filter((x) => x.props.shape === ce.CIRCLE).attr("r", (x) => x.renderedSize.radius), w.filter((x) => x.props.shape === ce.CIRCLE).selectChild(".graph-controller__node-label-container").attr("width", (x) => 2 * x.renderedSize.radius).attr("height", (x) => 2 * x.renderedSize.radius).attr("x", (x) => -x.renderedSize.radius).attr("y", (x) => -x.renderedSize.radius), w.selectChild(".graph-controller__node").filter((x) => x.props.shape === ce.RECTANGLE).attr("width", (x) => x.renderedSize.width).attr("height", (x) => x.renderedSize.height).attr("x", (x) => -0.5 * x.renderedSize.width).attr("y", (x) => -0.5 * x.renderedSize.height).attr("rx", (x) => x.props?.cornerRadius).attr("ry", (x) => x.props?.cornerRadius), w.filter((x) => x.props.shape === ce.RECTANGLE).selectChild(".graph-controller__node-label-container").attr("width", (x) => x.renderedSize.width).attr("height", (x) => x.renderedSize.height).attr("x", (x) => -0.5 * x.renderedSize.width).attr("y", (x) => -0.5 * x.renderedSize.height);
    }
    function ir() {
      k.selectChild("text").selectChild("textPath").selectChild("mjx-container").each(function(w) {
        const x = this, N = w, M = be(x.parentNode.parentNode.parentNode).selectChild("foreignObject").selectChild("div").attr("class", "graph-controller__link-label").classed(
          "hidden",
          !g.showLinkLabels || !N.label && !N.labelEditable
        ).node();
        M.replaceChild(x, M.childNodes[0]);
      }), k.selectChild("text").selectChild("textPath").each(function() {
        const w = this;
        let x = !1;
        w.childNodes.forEach((M) => {
          M?.nodeType === Node.TEXT_NODE && M?.textContent?.trim() !== "" && (x = !0);
        }), x || be(w).text("I").attr("class", "graph-controller__link-label-placeholder mjx-hidden");
      }), xn();
    }
    function xn() {
      k.selectChild("text").selectChild("textPath").each(function() {
        const w = this, [x, N] = G(w);
        be(w.parentNode.parentNode).select("foreignObject").attr("x", x).attr("y", N);
      });
    }
    function sr(w, x) {
      (w.button === 2 || w.pointerType === "touch") && (fi(w), x.allowOutgoingLinks && lr(x), x.deletable && (re = setTimeout(() => {
        D = void 0, or(x);
      }, 250)));
    }
    function or(w) {
      let x = n.value.node().querySelector(`#${l.value + "-node-" + w.id}`);
      be(x).classed("on-deletion", !0);
      let N = be(x.parentElement);
      if (w.props.shape === ce.CIRCLE) {
        let M = Zu().outerRadius(w.props.radius + 4).innerRadius(w.props.radius), I = [{ startAngle: 0, endAngle: 0 }];
        N.append("g").attr("class", "arc").selectAll("path.arc").data(I).enter().append("path").attr("class", "arc").style("fill", "black").style("opacity", 0.7).transition().duration(750).ease(si).attrTween("d", function(L) {
          let q = { startAngle: 0, endAngle: 2 * Math.PI }, Y = Ir(L, q);
          return function(J) {
            return M(Y(J));
          };
        }).on("end", () => Zt(w));
      } else if (w.props.shape === ce.RECTANGLE) {
        const M = Sh(
          w.renderedSize.width,
          w.renderedSize.height,
          w.props.cornerRadius
        );
        let I = N.append("path").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 4).attr("opacity", "0.7").attr("d", M), V = 2 * w.renderedSize.width + 2 * w.renderedSize.height;
        I.attr("stroke-dasharray", V).attr("stroke-dashoffset", V).transition().duration(750).ease(si).attr("stroke-dashoffset", 0).on("end", () => Zt(w));
      }
    }
    function Zt(w) {
      let x = d.value.removeNode(w);
      if (x !== void 0) {
        let [N, M] = x;
        In(N, n.value), M.forEach((I) => {
          zt(I, n.value);
        }), jn(b, d.value, g);
      }
      m.value = d.value.nodes.length > 0, K(), Pe();
    }
    function lr(w) {
      te = [w.x, w.y], P = w, Z.attr("marker-end", `url(#${l.value}-draggable-link-arrow)`).classed("hidden", !1).attr("d", ln(w, { x: te[0], y: te[1] }, g));
    }
    function En(w, x = void 0) {
      et(w), clearTimeout(re), x && Sn(x), w.pointerType === "mouse" || (w.pointerType === "touch" || w.pointerType === "pen") && !kh(
        { x: f.x, y: f.y },
        { x: w.x, y: w.y }
      ) ? kn() : K();
    }
    function Sn(w) {
      let x = n.value.node().querySelector(`#${l.value + "-node-" + w.id}`), N = be(x), M = be(x.parentElement);
      w.props.shape === ce.CIRCLE ? (N.classed("on-deletion", !1), M.select("g.arc").select("path.arc").interrupt().remove(), M.select("g.arc").remove()) : w.props.shape === ce.RECTANGLE && (N.classed("on-deletion") && M.select("path").attr("stroke-dasharray", 2 * w.props.width + 2 * w.props.height).attr("stroke-dashoffset", 0).transition().attr("stroke-dashoffset", 2 * w.props.width + 2 * w.props.height).on("end", () => {
        M.select("path").remove();
      }), N.classed("on-deletion", !1));
    }
    function kn() {
      const w = P, x = D;
      K(), !(w === void 0 || x === void 0) && vn(w, x);
    }
    function Gt(w) {
      if (et(w), P !== void 0) {
        const x = dl(w, n.value.node())[0];
        x !== void 0 && (te = [(x[0] - ne) / ge, (x[1] - he) / ge], xt());
      }
    }
    function Kt(w) {
      w.allowIncomingLinks && (D = w);
    }
    function Ht(w) {
      w && Sn(w), D = void 0, clearTimeout(re);
    }
    function p(w) {
      et(w), clearTimeout(de);
    }
    function i(w, x) {
      et(w), clearTimeout(de), (w.button === 2 || w.pointerType === "touch") && x.deletable && u(x);
    }
    function s(w, x) {
      (w.button === 2 || w.pointerType === "touch") && (fi(w), x.deletable && (de = setTimeout(() => {
        r(x);
      }, 250)));
    }
    function r(w) {
      let x = n.value.node().querySelector(`#${l.value + "-link-" + w.id}`);
      if (be(x).classed("on-deletion", !0), x instanceof SVGPathElement) {
        let N = be(x), M = x.getTotalLength(), I = x.parentElement.querySelector("text"), V = Array.from(I.classList).some(
          (Y) => Y.includes("reverse")
        ), L = 0, q = V ? M : -M;
        N.attr("stroke-dasharray", M).attr("stroke-dashoffset", L).transition().duration(750).attr("stroke-dashoffset", q).on("end", () => o(w));
      }
    }
    function o(w) {
      let x = w.color, N = d.value.removeLink(w);
      N !== void 0 && zt(N, n.value), x && (d.value.hasNonDefaultLinkColor(x) || dr($, l.value, x)), Pe();
    }
    function u(w) {
      let x = n.value.node().querySelector(`#${l.value + "-link-" + w.id}`);
      if (be(x).classed("on-deletion") && x instanceof SVGPathElement) {
        let N = be(x), M = x.getTotalLength();
        N.attr("stroke-dasharray", M).attr("stroke-dashoffset", M).transition().attr("stroke-dashoffset", 0).on("end", () => {
          N.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
        });
      }
      be(x).classed("on-deletion", !1);
    }
    function v(w, x) {
      et(w), x.labelEditable && S(x, [x.x, x.y]);
    }
    function y(w, x) {
      if (x.labelEditable) {
        let N = w.target, M;
        N.nodeName === "textPath" ? M = N : M = N.closest(".graph-controller__link-container").querySelector("textPath");
        let I = G(M);
        S(x, I);
      }
    }
    function S(w, x) {
      let N = w instanceof Jn ? "node" : "link";
      const M = document.createElement("input");
      M.setAttribute("class", "graph-controller__label-input"), M.setAttribute("id", `${N}-label-input-field`), w.label == null ? M.value = "" : M.value = w.label, M.placeholder = `Enter ${N} label`;
      const I = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      I.setAttribute("width", "100%"), I.setAttribute("height", "100%"), I.setAttribute("x", `${x[0] - 90}`), I.setAttribute("y", `${x[1] - 12}`), I.append(M), n.value.select("svg").select("g").node().append(I), M.focus(), h !== "desktop" && (c = !0), M.ondblclick = function(L) {
        et(L);
      };
      let V = !1;
      M.onkeyup = function(L) {
        L.key === "Enter" ? (V = !0, M.blur()) : L.key === "Escape" && (M.value = "", M.blur());
      }, M.onblur = function() {
        V && E(w, M.value.trim()), I.remove(), h !== "desktop" && (c = !1);
      };
    }
    function E(w, x) {
      wh(w, x, n.value), w.label = x, Pe();
      let N = w instanceof Jn ? "node" : "link";
      N === "link" ? O(w) : N === "node" && x !== "" && T(w);
    }
    function O(w) {
      const x = n.value.node().querySelector(
        `#${l.value + "-link-" + w.id}`
      ).parentElement;
      x.querySelector("mjx-container")?.remove(), x.querySelector("div").setAttribute("class", "graph-controller__link-label-placeholder"), Pe();
    }
    function T(w) {
      const x = n.value.node().querySelector(`#${l.value + "-node-" + w.id}`).parentElement;
      if (x) {
        const N = x.parentElement;
        x.remove(), N.append(x);
      }
    }
    function G(w) {
      let x = n.value.select("svg").node().getBoundingClientRect(), N = w.getBoundingClientRect(), M = (N.x - x.x - ne) / ge, I = (N.y - x.y - he) / ge;
      return [M, I];
    }
    function K() {
      Z?.classed("hidden", !0).attr("marker-end", "null"), P = void 0, D = void 0, te = void 0;
    }
    function j(w) {
      let x, N;
      try {
        if (typeof w == "string")
          [x, N] = dc(w);
        else if (typeof w == "object")
          [x, N] = gc(w);
        else {
          qt("Invalid graph import type:", "Must either be TGF or JSON.");
          return;
        }
      } catch (M) {
        qt("Error during parsing:", `Invalid data format:
` + M);
        return;
      }
      le(), U(x, N);
    }
    function U(w, x) {
      for (let M of w)
        It(
          M.props ?? g.nodeProps,
          M.x,
          M.y,
          M.idImported,
          M.label,
          M.color,
          M.fixedPosition,
          M.deletable,
          M.labelEditable,
          M.allowIncomingLinks,
          M.allowOutgoingLinks
        );
      const N = (M) => d.value.nodes.find((I) => I.idImported === M);
      for (let M of x) {
        let I = N(M.sourceIdImported), V = N(M.targetIdImported);
        I && V && (vn(
          I,
          V,
          M.label,
          M.color,
          M.deletable,
          M.labelEditable
        ), M.color && Mr($, l.value, g, M.color));
      }
    }
    function se(w) {
      for (let x of w) {
        const N = d.value.links.filter((M) => M.id === x).map((M) => M.color).shift();
        N && (d.value.hasNonDefaultLinkColor(N, x) ? d.value.getLinkIdsWithNonDefaultLinkColors(
          N,
          x
        ).every(
          (V) => w.includes(V)
        ) && dr($, l.value, N) : dr($, l.value, N));
      }
    }
    function C() {
      b.stop(), n.value.selectChildren().remove(), z = void 0, ne = 0, he = 0, ge = 1, $ = void 0, Z = void 0, k = void 0, B = void 0, b = void 0, K(), Ct();
    }
    function H() {
      g.isCanvasBoundToView && (c || C());
    }
    function le() {
      d.value.links.forEach((w) => zt(w, n.value)), d.value.nodes.forEach((w) => In(w, n.value)), d.value = new di(), m.value = !1, C();
    }
    return (w, x) => (kt(), St(gr, null, [
      x[0] || (x[0] = at("div", { class: "graph-controller__graph-host uninitialised" }, null, -1)),
      zn(at("div", null, [
        xs(Rs, {
          class: "graph-controller__info-text-background",
          "show-controls-graph": "",
          "show-latex-info": !0,
          "show-controls-environment": !1,
          "show-header": !0,
          "platform-type": pr(h)
        }, null, 8, ["platform-type"])
      ], 512), [
        [$n, !m.value]
      ])
    ], 64));
  }
});
export {
  xc as GraphComponent
};
