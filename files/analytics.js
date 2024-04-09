! function() {
  var t, e, n, r, i = {
      8878: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var i = r(n(325));

        function o(t, e) {
          return function() {
            var n = this.traits(),
              r = this.properties ? this.properties() : {};
            return i.default(n, "address." + t) || i.default(n, t) || (e ? i.default(n, "address." + e) : null) || (e ? i.default(n, e) : null) || i.default(r, "address." + t) || i.default(r, t) || (e ? i.default(r, "address." + e) : null) || (e ? i.default(r, e) : null)
          }
        }
        e.default = function(t) {
          t.zip = o("postalCode", "zip"), t.country = o("country"), t.street = o("street"), t.state = o("state"), t.city = o("city"), t.region = o("region")
        }
      },
      4780: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Alias = void 0;
        var i = r(n(1285)),
          o = n(9512);

        function s(t, e) {
          o.Facade.call(this, t, e)
        }
        e.Alias = s, i.default(s, o.Facade), s.prototype.action = function() {
          return "alias"
        }, s.prototype.type = s.prototype.action, s.prototype.previousId = function() {
          return this.field("previousId") || this.field("from")
        }, s.prototype.from = s.prototype.previousId, s.prototype.userId = function() {
          return this.field("userId") || this.field("to")
        }, s.prototype.to = s.prototype.userId
      },
      4814: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.clone = void 0, e.clone = function t(e) {
          if ("[object Object]" === Object.prototype.toString.call(e)) {
            var n = {};
            for (var r in e) n[r] = t(e[r]);
            return n
          }
          return Array.isArray(e) ? e.map(t) : e
        }
      },
      5257: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Delete = void 0;
        var i = r(n(1285)),
          o = n(9512);

        function s(t, e) {
          o.Facade.call(this, t, e)
        }
        e.Delete = s, i.default(s, o.Facade), s.prototype.type = function() {
          return "delete"
        }
      },
      9512: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Facade = void 0;
        var i = r(n(8878)),
          o = n(4814),
          s = r(n(2272)),
          u = r(n(5870)),
          a = r(n(325)),
          c = r(n(6279));

        function l(t, e) {
          e = e || {}, this.raw = o.clone(t), "clone" in e || (e.clone = !0), e.clone && (t = o.clone(t)), "traverse" in e || (e.traverse = !0), t.timestamp = "timestamp" in t ? u.default(t.timestamp) : new Date, e.traverse && c.default(t), this.opts = e, this.obj = t
        }
        e.Facade = l;
        var f = l.prototype;

        function p(t) {
          return o.clone(t)
        }
        f.proxy = function(t) {
          var e = t.split("."),
            n = this[t = e.shift()] || this.field(t);
          return n ? ("function" == typeof n && (n = n.call(this) || {}), 0 === e.length || (n = a.default(n, e.join("."))), this.opts.clone ? p(n) : n) : n
        }, f.field = function(t) {
          var e = this.obj[t];
          return this.opts.clone ? p(e) : e
        }, l.proxy = function(t) {
          return function() {
            return this.proxy(t)
          }
        }, l.field = function(t) {
          return function() {
            return this.field(t)
          }
        }, l.multi = function(t) {
          return function() {
            var e = this.proxy(t + "s");
            if (Array.isArray(e)) return e;
            var n = this.proxy(t);
            return n && (n = [this.opts.clone ? o.clone(n) : n]), n || []
          }
        }, l.one = function(t) {
          return function() {
            var e = this.proxy(t);
            if (e) return e;
            var n = this.proxy(t + "s");
            return Array.isArray(n) ? n[0] : void 0
          }
        }, f.json = function() {
          var t = this.opts.clone ? o.clone(this.obj) : this.obj;
          return this.type && (t.type = this.type()), t
        }, f.rawEvent = function() {
          return this.raw
        }, f.options = function(t) {
          var e = this.obj.options || this.obj.context || {},
            n = this.opts.clone ? o.clone(e) : e;
          if (!t) return n;
          if (this.enabled(t)) {
            var r = this.integrations(),
              i = r[t] || a.default(r, t);
            return "object" != typeof i && (i = a.default(this.options(), t)), "object" == typeof i ? i : {}
          }
        }, f.context = f.options, f.enabled = function(t) {
          var e = this.proxy("options.providers.all");
          "boolean" != typeof e && (e = this.proxy("options.all")), "boolean" != typeof e && (e = this.proxy("integrations.all")), "boolean" != typeof e && (e = !0);
          var n = e && s.default(t),
            r = this.integrations();
          if (r.providers && r.providers.hasOwnProperty(t) && (n = r.providers[t]), r.hasOwnProperty(t)) {
            var i = r[t];
            n = "boolean" != typeof i || i
          }
          return !!n
        }, f.integrations = function() {
          return this.obj.integrations || this.proxy("options.providers") || this.options()
        }, f.active = function() {
          var t = this.proxy("options.active");
          return null == t && (t = !0), t
        }, f.anonymousId = function() {
          return this.field("anonymousId") || this.field("sessionId")
        }, f.sessionId = f.anonymousId, f.groupId = l.proxy("options.groupId"), f.traits = function(t) {
          var e = this.proxy("options.traits") || {},
            n = this.userId();
          for (var r in t = t || {}, n && (e.id = n), t) {
            var i = null == this[r] ? this.proxy("options.traits." + r) : this[r]();
            null != i && (e[t[r]] = i, delete e[r])
          }
          return e
        }, f.library = function() {
          var t = this.proxy("options.library");
          return t ? "string" == typeof t ? {
            name: t,
            version: null
          } : t : {
            name: "unknown",
            version: null
          }
        }, f.device = function() {
          var t = this.proxy("context.device");
          "object" == typeof t && null !== t || (t = {});
          var e = this.library().name;
          return t.type || (e.indexOf("ios") > -1 && (t.type = "ios"), e.indexOf("android") > -1 && (t.type = "android")), t
        }, f.userAgent = l.proxy("context.userAgent"), f.timezone = l.proxy("context.timezone"), f.timestamp = l.field("timestamp"), f.channel = l.field("channel"), f.ip = l.proxy("context.ip"), f.userId = l.field("userId"), i.default(f)
      },
      615: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Group = void 0;
        var i = r(n(1285)),
          o = r(n(4554)),
          s = r(n(5870)),
          u = n(9512);

        function a(t, e) {
          u.Facade.call(this, t, e)
        }
        e.Group = a, i.default(a, u.Facade);
        var c = a.prototype;
        c.action = function() {
          return "group"
        }, c.type = c.action, c.groupId = u.Facade.field("groupId"), c.created = function() {
          var t = this.proxy("traits.createdAt") || this.proxy("traits.created") || this.proxy("properties.createdAt") || this.proxy("properties.created");
          if (t) return s.default(t)
        }, c.email = function() {
          var t = this.proxy("traits.email");
          if (t) return t;
          var e = this.groupId();
          return o.default(e) ? e : void 0
        }, c.traits = function(t) {
          var e = this.properties(),
            n = this.groupId();
          for (var r in t = t || {}, n && (e.id = n), t) {
            var i = null == this[r] ? this.proxy("traits." + r) : this[r]();
            null != i && (e[t[r]] = i, delete e[r])
          }
          return e
        }, c.name = u.Facade.proxy("traits.name"), c.industry = u.Facade.proxy("traits.industry"), c.employees = u.Facade.proxy("traits.employees"), c.properties = function() {
          return this.field("traits") || this.field("properties") || {}
        }
      },
      4705: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Identify = void 0;
        var i = n(9512),
          o = r(n(325)),
          s = r(n(1285)),
          u = r(n(4554)),
          a = r(n(5870)),
          c = function(t) {
            return t.trim()
          };

        function l(t, e) {
          i.Facade.call(this, t, e)
        }
        e.Identify = l, s.default(l, i.Facade);
        var f = l.prototype;
        f.action = function() {
          return "identify"
        }, f.type = f.action, f.traits = function(t) {
          var e = this.field("traits") || {},
            n = this.userId();
          for (var r in t = t || {}, n && (e.id = n), t) {
            var i = null == this[r] ? this.proxy("traits." + r) : this[r]();
            null != i && (e[t[r]] = i, r !== t[r] && delete e[r])
          }
          return e
        }, f.email = function() {
          var t = this.proxy("traits.email");
          if (t) return t;
          var e = this.userId();
          return u.default(e) ? e : void 0
        }, f.created = function() {
          var t = this.proxy("traits.created") || this.proxy("traits.createdAt");
          if (t) return a.default(t)
        }, f.companyCreated = function() {
          var t = this.proxy("traits.company.created") || this.proxy("traits.company.createdAt");
          if (t) return a.default(t)
        }, f.companyName = function() {
          return this.proxy("traits.company.name")
        }, f.name = function() {
          var t = this.proxy("traits.name");
          if ("string" == typeof t) return c(t);
          var e = this.firstName(),
            n = this.lastName();
          return e && n ? c(e + " " + n) : void 0
        }, f.firstName = function() {
          var t = this.proxy("traits.firstName");
          if ("string" == typeof t) return c(t);
          var e = this.proxy("traits.name");
          return "string" == typeof e ? c(e).split(" ")[0] : void 0
        }, f.lastName = function() {
          var t = this.proxy("traits.lastName");
          if ("string" == typeof t) return c(t);
          var e = this.proxy("traits.name");
          if ("string" == typeof e) {
            var n = c(e).indexOf(" ");
            if (-1 !== n) return c(e.substr(n + 1))
          }
        }, f.uid = function() {
          return this.userId() || this.username() || this.email()
        }, f.description = function() {
          return this.proxy("traits.description") || this.proxy("traits.background")
        }, f.age = function() {
          var t = this.birthday(),
            e = o.default(this.traits(), "age");
          return null != e ? e : t instanceof Date ? (new Date).getFullYear() - t.getFullYear() : void 0
        }, f.avatar = function() {
          var t = this.traits();
          return o.default(t, "avatar") || o.default(t, "photoUrl") || o.default(t, "avatarUrl")
        }, f.position = function() {
          var t = this.traits();
          return o.default(t, "position") || o.default(t, "jobTitle")
        }, f.username = i.Facade.proxy("traits.username"), f.website = i.Facade.one("traits.website"), f.websites = i.Facade.multi("traits.website"), f.phone = i.Facade.one("traits.phone"), f.phones = i.Facade.multi("traits.phone"), f.address = i.Facade.proxy("traits.address"), f.gender = i.Facade.proxy("traits.gender"), f.birthday = i.Facade.proxy("traits.birthday")
      },
      4122: function(t, e, n) {
        "use strict";
        var r = this && this.__assign || function() {
          return r = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
          }, r.apply(this, arguments)
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Delete = e.Screen = e.Page = e.Track = e.Identify = e.Group = e.Alias = e.Facade = void 0;
        var i = n(9512);
        Object.defineProperty(e, "Facade", {
          enumerable: !0,
          get: function() {
            return i.Facade
          }
        });
        var o = n(4780);
        Object.defineProperty(e, "Alias", {
          enumerable: !0,
          get: function() {
            return o.Alias
          }
        });
        var s = n(615);
        Object.defineProperty(e, "Group", {
          enumerable: !0,
          get: function() {
            return s.Group
          }
        });
        var u = n(4705);
        Object.defineProperty(e, "Identify", {
          enumerable: !0,
          get: function() {
            return u.Identify
          }
        });
        var a = n(5480);
        Object.defineProperty(e, "Track", {
          enumerable: !0,
          get: function() {
            return a.Track
          }
        });
        var c = n(5926);
        Object.defineProperty(e, "Page", {
          enumerable: !0,
          get: function() {
            return c.Page
          }
        });
        var l = n(1207);
        Object.defineProperty(e, "Screen", {
          enumerable: !0,
          get: function() {
            return l.Screen
          }
        });
        var f = n(5257);
        Object.defineProperty(e, "Delete", {
          enumerable: !0,
          get: function() {
            return f.Delete
          }
        }), e.default = r(r({}, i.Facade), {
          Alias: o.Alias,
          Group: s.Group,
          Identify: u.Identify,
          Track: a.Track,
          Page: c.Page,
          Screen: l.Screen,
          Delete: f.Delete
        })
      },
      4554: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var n = /.+\@.+\..+/;
        e.default = function(t) {
          return n.test(t)
        }
      },
      2272: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var n = {
          Salesforce: !0
        };
        e.default = function(t) {
          return !n[t]
        }
      },
      5926: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Page = void 0;
        var i = r(n(1285)),
          o = n(9512),
          s = n(5480),
          u = r(n(4554));

        function a(t, e) {
          o.Facade.call(this, t, e)
        }
        e.Page = a, i.default(a, o.Facade);
        var c = a.prototype;
        c.action = function() {
          return "page"
        }, c.type = c.action, c.category = o.Facade.field("category"), c.name = o.Facade.field("name"), c.title = o.Facade.proxy("properties.title"), c.path = o.Facade.proxy("properties.path"), c.url = o.Facade.proxy("properties.url"), c.referrer = function() {
          return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer")
        }, c.properties = function(t) {
          var e = this.field("properties") || {},
            n = this.category(),
            r = this.name();
          for (var i in t = t || {}, n && (e.category = n), r && (e.name = r), t) {
            var o = null == this[i] ? this.proxy("properties." + i) : this[i]();
            null != o && (e[t[i]] = o, i !== t[i] && delete e[i])
          }
          return e
        }, c.email = function() {
          var t = this.proxy("context.traits.email") || this.proxy("properties.email");
          if (t) return t;
          var e = this.userId();
          return u.default(e) ? e : void 0
        }, c.fullName = function() {
          var t = this.category(),
            e = this.name();
          return e && t ? t + " " + e : e
        }, c.event = function(t) {
          return t ? "Viewed " + t + " Page" : "Loaded a Page"
        }, c.track = function(t) {
          var e = this.json();
          return e.event = this.event(t), e.timestamp = this.timestamp(), e.properties = this.properties(), new s.Track(e, this.opts)
        }
      },
      1207: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Screen = void 0;
        var i = r(n(1285)),
          o = n(5926),
          s = n(5480);

        function u(t, e) {
          o.Page.call(this, t, e)
        }
        e.Screen = u, i.default(u, o.Page), u.prototype.action = function() {
          return "screen"
        }, u.prototype.type = u.prototype.action, u.prototype.event = function(t) {
          return t ? "Viewed " + t + " Screen" : "Loaded a Screen"
        }, u.prototype.track = function(t) {
          var e = this.json();
          return e.event = this.event(t), e.timestamp = this.timestamp(), e.properties = this.properties(), new s.Track(e, this.opts)
        }
      },
      5480: function(t, e, n) {
        "use strict";
        var r = this && this.__importDefault || function(t) {
          return t && t.__esModule ? t : {
            default: t
          }
        };
        Object.defineProperty(e, "__esModule", {
          value: !0
        }), e.Track = void 0;
        var i = r(n(1285)),
          o = n(9512),
          s = n(4705),
          u = r(n(4554)),
          a = r(n(325));

        function c(t, e) {
          o.Facade.call(this, t, e)
        }
        e.Track = c, i.default(c, o.Facade);
        var l = c.prototype;
        l.action = function() {
          return "track"
        }, l.type = l.action, l.event = o.Facade.field("event"), l.value = o.Facade.proxy("properties.value"), l.category = o.Facade.proxy("properties.category"), l.id = o.Facade.proxy("properties.id"), l.productId = function() {
          return this.proxy("properties.product_id") || this.proxy("properties.productId")
        }, l.promotionId = function() {
          return this.proxy("properties.promotion_id") || this.proxy("properties.promotionId")
        }, l.cartId = function() {
          return this.proxy("properties.cart_id") || this.proxy("properties.cartId")
        }, l.checkoutId = function() {
          return this.proxy("properties.checkout_id") || this.proxy("properties.checkoutId")
        }, l.paymentId = function() {
          return this.proxy("properties.payment_id") || this.proxy("properties.paymentId")
        }, l.couponId = function() {
          return this.proxy("properties.coupon_id") || this.proxy("properties.couponId")
        }, l.wishlistId = function() {
          return this.proxy("properties.wishlist_id") || this.proxy("properties.wishlistId")
        }, l.reviewId = function() {
          return this.proxy("properties.review_id") || this.proxy("properties.reviewId")
        }, l.orderId = function() {
          return this.proxy("properties.id") || this.proxy("properties.order_id") || this.proxy("properties.orderId")
        }, l.sku = o.Facade.proxy("properties.sku"), l.tax = o.Facade.proxy("properties.tax"), l.name = o.Facade.proxy("properties.name"), l.price = o.Facade.proxy("properties.price"), l.total = o.Facade.proxy("properties.total"), l.repeat = o.Facade.proxy("properties.repeat"), l.coupon = o.Facade.proxy("properties.coupon"), l.shipping = o.Facade.proxy("properties.shipping"), l.discount = o.Facade.proxy("properties.discount"), l.shippingMethod = function() {
          return this.proxy("properties.shipping_method") || this.proxy("properties.shippingMethod")
        }, l.paymentMethod = function() {
          return this.proxy("properties.payment_method") || this.proxy("properties.paymentMethod")
        }, l.description = o.Facade.proxy("properties.description"), l.plan = o.Facade.proxy("properties.plan"), l.subtotal = function() {
          var t = a.default(this.properties(), "subtotal"),
            e = this.total() || this.revenue();
          if (t) return t;
          if (!e) return 0;
          if (this.total()) {
            var n = this.tax();
            n && (e -= n), (n = this.shipping()) && (e -= n), (n = this.discount()) && (e += n)
          }
          return e
        }, l.products = function() {
          var t = this.properties(),
            e = a.default(t, "products");
          return Array.isArray(e) ? e.filter((function(t) {
            return null !== t
          })) : []
        }, l.quantity = function() {
          return (this.obj.properties || {}).quantity || 1
        }, l.currency = function() {
          return (this.obj.properties || {}).currency || "USD"
        }, l.referrer = function() {
          return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer")
        }, l.query = o.Facade.proxy("options.query"), l.properties = function(t) {
          var e = this.field("properties") || {};
          for (var n in t = t || {}) {
            var r = null == this[n] ? this.proxy("properties." + n) : this[n]();
            null != r && (e[t[n]] = r, delete e[n])
          }
          return e
        }, l.username = function() {
          return this.proxy("traits.username") || this.proxy("properties.username") || this.userId() || this.sessionId()
        }, l.email = function() {
          var t = this.proxy("traits.email") || this.proxy("properties.email") || this.proxy("options.traits.email");
          if (t) return t;
          var e = this.userId();
          return u.default(e) ? e : void 0
        }, l.revenue = function() {
          var t = this.proxy("properties.revenue"),
            e = this.event();
          return !t && e && e.match(/^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i) && (t = this.proxy("properties.total")),
            function(t) {
              if (!t) return;
              if ("number" == typeof t) return t;
              if ("string" != typeof t) return;
              if (t = t.replace(/\$/g, ""), t = parseFloat(t), !isNaN(t)) return t
            }(t)
        }, l.cents = function() {
          var t = this.revenue();
          return "number" != typeof t ? this.value() || 0 : 100 * t
        }, l.identify = function() {
          var t = this.json();
          return t.traits = this.traits(), new s.Identify(t, this.opts)
        }
      },
      6279: function(t, e, n) {
        "use strict";
        var r = n(8264);

        function i(t, e) {
          return void 0 === e && (e = !0), t && "object" == typeof t ? function(t, e) {
            return Object.keys(t).forEach((function(n) {
              t[n] = i(t[n], e)
            })), t
          }(t, e) : Array.isArray(t) ? function(t, e) {
            return t.forEach((function(n, r) {
              t[r] = i(n, e)
            })), t
          }(t, e) : r.is(t, e) ? r.parse(t) : t
        }
        t.exports = i
      },
      8264: function(t, e) {
        "use strict";
        var n = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
        e.parse = function(t) {
          var e = [1, 5, 6, 7, 11, 12],
            r = n.exec(t),
            i = 0;
          if (!r) return new Date(t);
          for (var o, s = 0; o = e[s]; s++) r[o] = parseInt(r[o], 10) || 0;
          r[2] = parseInt(r[2], 10) || 1, r[3] = parseInt(r[3], 10) || 1, r[2]--, r[8] = r[8] ? (r[8] + "00").substring(0, 3) : 0, " " === r[4] ? i = (new Date).getTimezoneOffset() : "Z" !== r[9] && r[10] && (i = 60 * r[11] + r[12], "+" === r[10] && (i = 0 - i));
          var u = Date.UTC(r[1], r[2], r[3], r[5], r[6] + i, r[7], r[8]);
          return new Date(u)
        }, e.is = function(t, e) {
          return "string" == typeof t && ((!e || !1 !== /^\d{4}-\d{2}-\d{2}/.test(t)) && n.test(t))
        }
      },
      1285: function(t) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
          e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }))
        } : t.exports = function(t, e) {
          if (e) {
            t.super_ = e;
            var n = function() {};
            n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
          }
        }
      },
      5870: function(t, e, n) {
        "use strict";
        var r = n(8264),
          i = n(5228),
          o = n(6076),
          s = Object.prototype.toString;
        t.exports = function(t) {
          return e = t, "[object Date]" === s.call(e) ? t : function(t) {
            return "[object Number]" === s.call(t)
          }(t) ? new Date((n = t) < 315576e5 ? 1e3 * n : n) : r.is(t) ? r.parse(t) : i.is(t) ? i.parse(t) : o.is(t) ? o.parse(t) : new Date(t);
          var e, n
        }
      },
      5228: function(t, e) {
        "use strict";
        var n = /\d{13}/;
        e.is = function(t) {
          return n.test(t)
        }, e.parse = function(t) {
          return t = parseInt(t, 10), new Date(t)
        }
      },
      6076: function(t, e) {
        "use strict";
        var n = /\d{10}/;
        e.is = function(t) {
          return n.test(t)
        }, e.parse = function(t) {
          var e = 1e3 * parseInt(t, 10);
          return new Date(e)
        }
      },
      325: function(t) {
        function e(t) {
          return function(e, n, r, o) {
            var s, u = o && function(t) {
              return "function" == typeof t
            }(o.normalizer) ? o.normalizer : i;
            n = u(n);
            for (var a = !1; !a;) c();

            function c() {
              for (s in e) {
                var t = u(s);
                if (0 === n.indexOf(t)) {
                  var r = n.substr(t.length);
                  if ("." === r.charAt(0) || 0 === r.length) {
                    n = r.substr(1);
                    var i = e[s];
                    return null == i ? void(a = !0) : n.length ? void(e = i) : void(a = !0)
                  }
                }
              }
              s = void 0, a = !0
            }
            if (s) return null == e ? e : t(e, s, r)
          }
        }

        function n(t, e) {
          return t.hasOwnProperty(e) && delete t[e], t
        }

        function r(t, e, n) {
          return t.hasOwnProperty(e) && (t[e] = n), t
        }

        function i(t) {
          return t.replace(/[^a-zA-Z0-9\.]+/g, "").toLowerCase()
        }
        t.exports = e((function(t, e) {
          if (t.hasOwnProperty(e)) return t[e]
        })), t.exports.find = t.exports, t.exports.replace = function(t, n, i, o) {
          return e(r).call(this, t, n, i, o), t
        }, t.exports.del = function(t, r, i) {
          return e(n).call(this, t, r, null, i), t
        }
      },
      4791: function(t) {
        t.exports = function(t) {
          "use strict";
          var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

          function n(t, e) {
            var n = t[0],
              r = t[1],
              i = t[2],
              o = t[3];
            r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[1] - 389564586 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[2] + 606105819 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[3] - 1044525330 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[5] + 1200080426 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[6] - 1473231341 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[7] - 45705983 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[9] - 1958414417 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[10] - 42063 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[11] - 1990404162 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + e[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + e[13] - 40341101 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + e[14] - 1502002290 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + e[15] + 1236535329 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[6] - 1069501632 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[11] + 643717713 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[0] - 373897302 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[10] + 38016083 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[15] - 660478335 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[4] - 405537848 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[14] - 1019803690 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[3] - 187363961 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[8] + 1163531501 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + e[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + e[2] - 51403784 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + e[7] + 1735328473 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + e[12] - 1926607734 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[8] - 2022574463 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[11] + 1839030562 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[14] - 35309556 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[4] + 1272893353 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[7] - 155497632 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[10] - 1094730640 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[0] - 358537222 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[3] - 722521979 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[6] + 76029189 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + e[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + e[12] - 421815835 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + e[15] + 530742520 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + e[2] - 995338651 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[7] + 1126891415 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[14] - 1416354905 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[5] - 57434055 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[3] - 1894986606 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[10] - 1051523 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[1] - 2054922799 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[15] - 30611744 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[6] - 1560198380 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[13] + 1309151649 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + e[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + e[11] - 1120210379 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + e[2] + 718787259 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + e[9] - 343485551 | 0) << 21 | r >>> 11) + i | 0, t[0] = n + t[0] | 0, t[1] = r + t[1] | 0, t[2] = i + t[2] | 0, t[3] = o + t[3] | 0
          }

          function r(t) {
            var e, n = [];
            for (e = 0; e < 64; e += 4) n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
            return n
          }

          function i(t) {
            var e, n = [];
            for (e = 0; e < 64; e += 4) n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
            return n
          }

          function o(t) {
            var e, i, o, s, u, a, c = t.length,
              l = [1732584193, -271733879, -1732584194, 271733878];
            for (e = 64; e <= c; e += 64) n(l, r(t.substring(e - 64, e)));
            for (i = (t = t.substring(e - 64)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < i; e += 1) o[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
            if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)
              for (n(l, o), e = 0; e < 16; e += 1) o[e] = 0;
            return s = (s = 8 * c).toString(16).match(/(.*?)(.{0,8})$/), u = parseInt(s[2], 16), a = parseInt(s[1], 16) || 0, o[14] = u, o[15] = a, n(l, o), l
          }

          function s(t) {
            var e, r, o, s, u, a, c = t.length,
              l = [1732584193, -271733879, -1732584194, 271733878];
            for (e = 64; e <= c; e += 64) n(l, i(t.subarray(e - 64, e)));
            for (r = (t = e - 64 < c ? t.subarray(e - 64) : new Uint8Array(0)).length, o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < r; e += 1) o[e >> 2] |= t[e] << (e % 4 << 3);
            if (o[e >> 2] |= 128 << (e % 4 << 3), e > 55)
              for (n(l, o), e = 0; e < 16; e += 1) o[e] = 0;
            return s = (s = 8 * c).toString(16).match(/(.*?)(.{0,8})$/), u = parseInt(s[2], 16), a = parseInt(s[1], 16) || 0, o[14] = u, o[15] = a, n(l, o), l
          }

          function u(t) {
            var n, r = "";
            for (n = 0; n < 4; n += 1) r += e[t >> 8 * n + 4 & 15] + e[t >> 8 * n & 15];
            return r
          }

          function a(t) {
            var e;
            for (e = 0; e < t.length; e += 1) t[e] = u(t[e]);
            return t.join("")
          }

          function c(t) {
            return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t
          }

          function l(t, e) {
            var n, r = t.length,
              i = new ArrayBuffer(r),
              o = new Uint8Array(i);
            for (n = 0; n < r; n += 1) o[n] = t.charCodeAt(n);
            return e ? o : i
          }

          function f(t) {
            return String.fromCharCode.apply(null, new Uint8Array(t))
          }

          function p(t, e, n) {
            var r = new Uint8Array(t.byteLength + e.byteLength);
            return r.set(new Uint8Array(t)), r.set(new Uint8Array(e), t.byteLength), n ? r : r.buffer
          }

          function d(t) {
            var e, n = [],
              r = t.length;
            for (e = 0; e < r - 1; e += 2) n.push(parseInt(t.substr(e, 2), 16));
            return String.fromCharCode.apply(String, n)
          }

          function h() {
            this.reset()
          }
          return a(o("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
            function e(t, e) {
              return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
            }
            ArrayBuffer.prototype.slice = function(n, r) {
              var i, o, s, u, a = this.byteLength,
                c = e(n, a),
                l = a;
              return r !== t && (l = e(r, a)), c > l ? new ArrayBuffer(0) : (i = l - c, o = new ArrayBuffer(i), s = new Uint8Array(o), u = new Uint8Array(this, c, i), s.set(u), o)
            }
          }(), h.prototype.append = function(t) {
            return this.appendBinary(c(t)), this
          }, h.prototype.appendBinary = function(t) {
            this._buff += t, this._length += t.length;
            var e, i = this._buff.length;
            for (e = 64; e <= i; e += 64) n(this._hash, r(this._buff.substring(e - 64, e)));
            return this._buff = this._buff.substring(e - 64), this
          }, h.prototype.end = function(t) {
            var e, n, r = this._buff,
              i = r.length,
              o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < i; e += 1) o[e >> 2] |= r.charCodeAt(e) << (e % 4 << 3);
            return this._finish(o, i), n = a(this._hash), t && (n = d(n)), this.reset(), n
          }, h.prototype.reset = function() {
            return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
          }, h.prototype.getState = function() {
            return {
              buff: this._buff,
              length: this._length,
              hash: this._hash.slice()
            }
          }, h.prototype.setState = function(t) {
            return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this
          }, h.prototype.destroy = function() {
            delete this._hash, delete this._buff, delete this._length
          }, h.prototype._finish = function(t, e) {
            var r, i, o, s = e;
            if (t[s >> 2] |= 128 << (s % 4 << 3), s > 55)
              for (n(this._hash, t), s = 0; s < 16; s += 1) t[s] = 0;
            r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), i = parseInt(r[2], 16), o = parseInt(r[1], 16) || 0, t[14] = i, t[15] = o, n(this._hash, t)
          }, h.hash = function(t, e) {
            return h.hashBinary(c(t), e)
          }, h.hashBinary = function(t, e) {
            var n = a(o(t));
            return e ? d(n) : n
          }, h.ArrayBuffer = function() {
            this.reset()
          }, h.ArrayBuffer.prototype.append = function(t) {
            var e, r = p(this._buff.buffer, t, !0),
              o = r.length;
            for (this._length += t.byteLength, e = 64; e <= o; e += 64) n(this._hash, i(r.subarray(e - 64, e)));
            return this._buff = e - 64 < o ? new Uint8Array(r.buffer.slice(e - 64)) : new Uint8Array(0), this
          }, h.ArrayBuffer.prototype.end = function(t) {
            var e, n, r = this._buff,
              i = r.length,
              o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < i; e += 1) o[e >> 2] |= r[e] << (e % 4 << 3);
            return this._finish(o, i), n = a(this._hash), t && (n = d(n)), this.reset(), n
          }, h.ArrayBuffer.prototype.reset = function() {
            return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
          }, h.ArrayBuffer.prototype.getState = function() {
            var t = h.prototype.getState.call(this);
            return t.buff = f(t.buff), t
          }, h.ArrayBuffer.prototype.setState = function(t) {
            return t.buff = l(t.buff, !0), h.prototype.setState.call(this, t)
          }, h.ArrayBuffer.prototype.destroy = h.prototype.destroy, h.ArrayBuffer.prototype._finish = h.prototype._finish, h.ArrayBuffer.hash = function(t, e) {
            var n = a(s(new Uint8Array(t)));
            return e ? d(n) : n
          }, h
        }()
      },
      94: function(t, e, n) {
        "use strict";
        n.d(e, {
          G: function() {
            return i
          },
          s: function() {
            return o
          }
        });
        var r = n(204);

        function i() {
          return !(0, r.j)() || window.navigator.onLine
        }

        function o() {
          return !i()
        }
      },
      4328: function(t, e, n) {
        "use strict";
        n.d(e, {
          U: function() {
            return r
          }
        });
        var r = "api.segment.io/v1"
      },
      8404: function(t, e, n) {
        "use strict";
        n.d(e, {
          _: function() {
            return s
          }
        });
        var r = n(5163),
          i = n(1494),
          o = n(6218),
          s = function(t) {
            function e(e, n) {
              return t.call(this, e, n, new o.j) || this
            }
            return (0, r.ZT)(e, t), e.system = function() {
              return new this({
                type: "track",
                event: "system"
              })
            }, e
          }(i._)
      },
      204: function(t, e, n) {
        "use strict";

        function r() {
          return "undefined" != typeof window
        }

        function i() {
          return !r()
        }
        n.d(e, {
          j: function() {
            return r
          },
          s: function() {
            return i
          }
        })
      },
      6863: function(t, e, n) {
        "use strict";

        function r(t) {
          try {
            return decodeURIComponent(t.replace(/\+/g, " "))
          } catch (e) {
            return t
          }
        }
        n.d(e, {
          a: function() {
            return r
          }
        })
      },
      6218: function(t, e, n) {
        "use strict";
        n.d(e, {
          j: function() {
            return u
          }
        });
        var r, i = n(5163),
          o = n(417),
          s = n(449),
          u = function(t) {
            function e() {
              return null !== t && t.apply(this, arguments) || this
            }
            return (0, i.ZT)(e, t), e.initRemoteMetrics = function(t) {
              r = new s.B(t)
            }, e.prototype.increment = function(e, n, i) {
              t.prototype.increment.call(this, e, n, i), null == r || r.increment(e, null != i ? i : [])
            }, e
          }(o.s)
      },
      98: function(t, e, n) {
        "use strict";

        function r(t, e) {
          var n = e.methodName,
            r = e.integrationName,
            i = e.type,
            o = e.didError,
            s = void 0 !== o && o;
          t.stats.increment("analytics_js.integration.invoke".concat(s ? ".error" : ""), 1, ["method:".concat(n), "integration_name:".concat(r), "type:".concat(i)])
        }
        n.d(e, {
          z: function() {
            return r
          }
        })
      },
      449: function(t, e, n) {
        "use strict";
        n.d(e, {
          B: function() {
            return c
          }
        });
        var r = n(5163),
          i = n(4759),
          o = n(4278),
          s = n(6175),
          u = n(4328);

        function a(t) {
          console.error("Error sending segment performance metrics", t)
        }
        var c = function() {
          function t(t) {
            var e, n, r, i, o, s = this;
            if (this.host = null !== (e = null == t ? void 0 : t.host) && void 0 !== e ? e : u.U, this.sampleRate = null !== (n = null == t ? void 0 : t.sampleRate) && void 0 !== n ? n : 1, this.flushTimer = null !== (r = null == t ? void 0 : t.flushTimer) && void 0 !== r ? r : 3e4, this.maxQueueSize = null !== (i = null == t ? void 0 : t.maxQueueSize) && void 0 !== i ? i : 20, this.protocol = null !== (o = null == t ? void 0 : t.protocol) && void 0 !== o ? o : "https", this.queue = [], this.sampleRate > 0) {
              var c = !1,
                l = function() {
                  c || (c = !0, s.flush().catch(a), c = !1, setTimeout(l, s.flushTimer))
                };
              l()
            }
          }
          return t.prototype.increment = function(t, e) {
            if (t.includes("analytics_js.") && 0 !== e.length && !(Math.random() > this.sampleRate || this.queue.length >= this.maxQueueSize)) {
              var n = function(t, e, n) {
                var i = e.reduce((function(t, e) {
                  var n = e.split(":"),
                    r = n[0],
                    i = n[1];
                  return t[r] = i, t
                }), {});
                return {
                  type: "Counter",
                  metric: t,
                  value: 1,
                  tags: (0, r.pi)((0, r.pi)({}, i), {
                    library: "analytics.js",
                    library_version: "web" === n ? "next-".concat(o.i) : "npm:next-".concat(o.i)
                  })
                }
              }(t, e, (0, s.B)());
              this.queue.push(n), t.includes("error") && this.flush().catch(a)
            }
          }, t.prototype.flush = function() {
            return (0, r.mG)(this, void 0, Promise, (function() {
              var t = this;
              return (0, r.Jh)(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.queue.length <= 0 ? [2] : [4, this.send().catch((function(e) {
                      a(e), t.sampleRate = 0
                    }))];
                  case 1:
                    return e.sent(), [2]
                }
              }))
            }))
          }, t.prototype.send = function() {
            return (0, r.mG)(this, void 0, Promise, (function() {
              var t, e, n;
              return (0, r.Jh)(this, (function(r) {
                return t = {
                  series: this.queue
                }, this.queue = [], e = {
                  "Content-Type": "text/plain"
                }, n = "".concat(this.protocol, "://").concat(this.host, "/m"), [2, (0, i.h)(n, {
                  headers: e,
                  body: JSON.stringify(t),
                  method: "POST"
                })]
              }))
            }))
          }, t
        }()
      },
      4278: function(t, e, n) {
        "use strict";
        n.d(e, {
          i: function() {
            return r
          }
        });
        var r = "1.66.0"
      },
      584: function(t, e, n) {
        "use strict";
        n.d(e, {
          M: function() {
            return r
          }
        });
        try {
          window.analyticsWriteKey = "p3i8NlCyISPdhPhpV2FSGMCbQrGJkTD6"
        } catch (t) {}

        function r() {
          if (void 0 !== window.analyticsWriteKey) return window.analyticsWriteKey !== ["__", "WRITE", "_", "KEY", "__"].join("") ? window.analyticsWriteKey : void 0
        }
      },
      4759: function(t, e, n) {
        "use strict";

        function r(t, e) {
          return e = e || {}, new Promise((function(n, r) {
            var i = new XMLHttpRequest,
              o = [],
              s = [],
              u = {},
              a = function() {
                return {
                  ok: 2 == (i.status / 100 | 0),
                  statusText: i.statusText,
                  status: i.status,
                  url: i.responseURL,
                  text: function() {
                    return Promise.resolve(i.responseText)
                  },
                  json: function() {
                    return Promise.resolve(JSON.parse(i.responseText))
                  },
                  blob: function() {
                    return Promise.resolve(new Blob([i.response]))
                  },
                  clone: a,
                  headers: {
                    keys: function() {
                      return o
                    },
                    entries: function() {
                      return s
                    },
                    get: function(t) {
                      return u[t.toLowerCase()]
                    },
                    has: function(t) {
                      return t.toLowerCase() in u
                    }
                  }
                }
              };
            for (var c in i.open(e.method || "get", t, !0), i.onload = function() {
                i.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (function(t, e, n) {
                  o.push(e = e.toLowerCase()), s.push([e, n]), u[e] = u[e] ? u[e] + "," + n : n
                })), n(a())
              }, i.onerror = r, i.withCredentials = "include" == e.credentials, e.headers) i.setRequestHeader(c, e.headers[c]);
            i.send(e.body || null)
          }))
        }
        n.d(e, {
          h: function() {
            return o
          }
        });
        var i = n(3744),
          o = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            var n = (0, i.R)();
            return (n && n.fetch || r).apply(void 0, t)
          }
      },
      3744: function(t, e, n) {
        "use strict";
        n.d(e, {
          R: function() {
            return r
          }
        });
        var r = function() {
          return "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : null
        }
      },
      6249: function(t, e, n) {
        "use strict";
        n.d(e, {
          jV: function() {
            return o
          },
          ql: function() {
            return s
          },
          wI: function() {
            return i
          }
        });
        var r = "segment_analytics";

        function i() {
          return window[r]
        }

        function o(t) {
          r = t
        }

        function s(t) {
          window[r] = t
        }
      },
      7070: function(t, e, n) {
        "use strict";

        function r(t) {
          return Array.prototype.slice.call(window.document.querySelectorAll("script")).find((function(e) {
            return e.src === t
          }))
        }

        function i(t, e) {
          var n = r(t);
          if (void 0 !== n) {
            var i = null == n ? void 0 : n.getAttribute("status");
            if ("loaded" === i) return Promise.resolve(n);
            if ("loading" === i) return new Promise((function(t, e) {
              n.addEventListener("load", (function() {
                return t(n)
              })), n.addEventListener("error", (function(t) {
                return e(t)
              }))
            }))
          }
          return new Promise((function(n, r) {
            var i, o = window.document.createElement("script");
            o.type = "text/javascript", o.src = t, o.async = !0, o.setAttribute("status", "loading");
            for (var s = 0, u = Object.entries(null != e ? e : {}); s < u.length; s++) {
              var a = u[s],
                c = a[0],
                l = a[1];
              o.setAttribute(c, l)
            }
            o.onload = function() {
              o.onerror = o.onload = null, o.setAttribute("status", "loaded"), n(o)
            }, o.onerror = function() {
              o.onerror = o.onload = null, o.setAttribute("status", "error"), r(new Error("Failed to load ".concat(t)))
            };
            var f = window.document.getElementsByTagName("script")[0];
            null === (i = f.parentElement) || void 0 === i || i.insertBefore(o, f)
          }))
        }

        function o(t) {
          var e = r(t);
          return void 0 !== e && e.remove(), Promise.resolve()
        }
        n.d(e, {
          t: function() {
            return o
          },
          v: function() {
            return i
          }
        })
      },
      5944: function(t, e, n) {
        "use strict";
        n.d(e, {
          o: function() {
            return i
          }
        });
        var r = n(5163);

        function i(t, e) {
          var n, i = Object.entries(null !== (n = e.integrations) && void 0 !== n ? n : {}).reduce((function(t, e) {
            var n, i, o = e[0],
              s = e[1];
            return "object" == typeof s ? (0, r.pi)((0, r.pi)({}, t), ((n = {})[o] = s, n)) : (0, r.pi)((0, r.pi)({}, t), ((i = {})[o] = {}, i))
          }), {});
          return Object.entries(t.integrations).reduce((function(t, e) {
            var n, o = e[0],
              s = e[1];
            return (0, r.pi)((0, r.pi)({}, t), ((n = {})[o] = (0, r.pi)((0, r.pi)({}, s), i[o]), n))
          }), {})
        }
      },
      8044: function(t, e, n) {
        "use strict";
        n.d(e, {
          x: function() {
            return i
          }
        });
        var r = n(5163),
          i = function(t, e) {
            return (0, r.mG)(void 0, void 0, Promise, (function() {
              var n;
              return (0, r.Jh)(this, (function(i) {
                return n = function(i) {
                  return (0, r.mG)(void 0, void 0, Promise, (function() {
                    var o;
                    return (0, r.Jh)(this, (function(r) {
                      switch (r.label) {
                        case 0:
                          return t(i) ? (o = n, [4, e()]) : [3, 2];
                        case 1:
                          return [2, o.apply(void 0, [r.sent()])];
                        case 2:
                          return [2]
                      }
                    }))
                  }))
                }, [2, n(void 0)]
              }))
            }))
          }
      },
      7566: function(t, e, n) {
        "use strict";
        n.d(e, {
          Kg: function() {
            return c
          },
          UH: function() {
            return u
          },
          Vl: function() {
            return a
          },
          YM: function() {
            return l
          }
        });
        var r, i = n(6249),
          o = n(584),
          s = /(https:\/\/.*)\/analytics\.js\/v1\/(?:.*?)\/(?:platform|analytics.*)?/,
          u = function(t) {
            var e = (0, i.wI)();
            e && (e._cdn = t), r = t
          },
          a = function() {
            var t, e = null != r ? r : null === (t = (0, i.wI)()) || void 0 === t ? void 0 : t._cdn;
            if (e) return e;
            var n, o = (Array.prototype.slice.call(document.querySelectorAll("script")).forEach((function(t) {
              var e, r = null !== (e = t.getAttribute("src")) && void 0 !== e ? e : "",
                i = s.exec(r);
              i && i[1] && (n = i[1])
            })), n);
            return o || "https://cdn.segment.com"
          },
          c = function() {
            var t = a();
            return "".concat(t, "/next-integrations")
          };

        function l() {
          for (var t, e, n, r = null !== (t = (0, o.M)()) && void 0 !== t ? t : null === (e = (0, i.wI)()) || void 0 === e ? void 0 : e._writeKey, u = void 0, a = 0, c = Array.prototype.slice.call(document.querySelectorAll("script")); a < c.length; a++) {
            var l = null !== (n = c[a].getAttribute("src")) && void 0 !== n ? n : "",
              f = s.exec(l);
            if (f && f[1]) {
              u = l;
              break
            }
          }
          return u ? u.replace("analytics.min.js", "analytics.classic.js") : "https://cdn.segment.com/analytics.js/v1/".concat(r, "/analytics.classic.js")
        }
      },
      3061: function(t, e, n) {
        "use strict";
        n.d(e, {
          $: function() {
            return p
          }
        });
        var r = n(5163),
          i = n(3098),
          o = n(8404),
          s = n(204),
          u = {
            getItem: function() {},
            setItem: function() {},
            removeItem: function() {}
          };
        try {
          u = (0, s.j)() && window.localStorage ? window.localStorage : u
        } catch (t) {
          console.warn("Unable to access localStorage", t)
        }

        function a(t) {
          var e = u.getItem(t);
          return (e ? JSON.parse(e) : []).map((function(t) {
            return new o._(t.event, t.id)
          }))
        }

        function c(t) {
          var e = u.getItem(t);
          return e ? JSON.parse(e) : {}
        }

        function l(t) {
          u.removeItem(t)
        }

        function f(t, e, n) {
          void 0 === n && (n = 0);
          var r = "persisted-queue:v1:".concat(t, ":lock"),
            i = u.getItem(r),
            o = i ? JSON.parse(i) : null,
            s = null === o || function(t) {
              return (new Date).getTime() > t
            }(o);
          if (s) return u.setItem(r, JSON.stringify((new Date).getTime() + 50)), e(), void u.removeItem(r);
          !s && n < 3 ? setTimeout((function() {
            f(t, e, n + 1)
          }), 50) : console.error("Unable to retrieve lock")
        }
        var p = function(t) {
          function e(e, n) {
            var i = t.call(this, e, []) || this,
              o = "persisted-queue:v1:".concat(n, ":items"),
              s = "persisted-queue:v1:".concat(n, ":seen"),
              p = [],
              d = {};
            return f(n, (function() {
              try {
                p = a(o), d = c(s), l(o), l(s), i.queue = (0, r.ev)((0, r.ev)([], p, !0), i.queue, !0), i.seen = (0, r.pi)((0, r.pi)({}, d), i.seen)
              } catch (t) {
                console.error(t)
              }
            })), window.addEventListener("pagehide", (function() {
              if (i.todo > 0) {
                var t = (0, r.ev)((0, r.ev)([], i.queue, !0), i.future, !0);
                try {
                  f(n, (function() {
                    ! function(t, e) {
                      var n = a(t),
                        i = (0, r.ev)((0, r.ev)([], e, !0), n, !0).reduce((function(t, e) {
                          var n;
                          return (0, r.pi)((0, r.pi)({}, t), ((n = {})[e.id] = e, n))
                        }), {});
                      u.setItem(t, JSON.stringify(Object.values(i)))
                    }(o, t),
                    function(t, e) {
                      var n = c(t);
                      u.setItem(t, JSON.stringify((0, r.pi)((0, r.pi)({}, n), e)))
                    }(s, i.seen)
                  }))
                } catch (t) {
                  console.error(t)
                }
              }
            })), i
          }
          return (0, r.ZT)(e, t), e
        }(i.Z)
      },
      9950: function(t, e, n) {
        "use strict";
        n.d(e, {
          D: function() {
            return i
          }
        });
        var r = n(4122);

        function i(t, e) {
          var n = new r.Facade(t, e);
          return "track" === t.type && (n = new r.Track(t, e)), "identify" === t.type && (n = new r.Identify(t, e)), "page" === t.type && (n = new r.Page(t, e)), "alias" === t.type && (n = new r.Alias(t, e)), "group" === t.type && (n = new r.Group(t, e)), "screen" === t.type && (n = new r.Screen(t, e)), Object.defineProperty(n, "obj", {
            value: t,
            writable: !0
          }), n
        }
      },
      6175: function(t, e, n) {
        "use strict";
        n.d(e, {
          B: function() {
            return o
          },
          X: function() {
            return i
          }
        });
        var r = "npm";

        function i(t) {
          r = t
        }

        function o() {
          return r
        }
      },
      6338: function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, {
          applyDestinationMiddleware: function() {
            return s
          },
          sourceMiddlewarePlugin: function() {
            return u
          }
        });
        var r = n(5163),
          i = n(1494),
          o = n(9950);

        function s(t, e, n) {
          return (0, r.mG)(this, void 0, Promise, (function() {
            function i(e, n) {
              return (0, r.mG)(this, void 0, Promise, (function() {
                var i, s, u;
                return (0, r.Jh)(this, (function(a) {
                  switch (a.label) {
                    case 0:
                      return i = !1, s = null, [4, n({
                        payload: (0, o.D)(e, {
                          clone: !0,
                          traverse: !1
                        }),
                        integration: t,
                        next: function(t) {
                          i = !0, null === t && (s = null), t && (s = t.obj)
                        }
                      })];
                    case 1:
                      return a.sent(), i || null === s || (s.integrations = (0, r.pi)((0, r.pi)({}, e.integrations), ((u = {})[t] = !1, u))), [2, s]
                  }
                }))
              }))
            }
            var s, u, a, c, l;
            return (0, r.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  s = (0, o.D)(e, {
                    clone: !0,
                    traverse: !1
                  }).rawEvent(), u = 0, a = n, t.label = 1;
                case 1:
                  return u < a.length ? (c = a[u], [4, i(s, c)]) : [3, 4];
                case 2:
                  if (null === (l = t.sent())) return [2, null];
                  s = l, t.label = 3;
                case 3:
                  return u++, [3, 1];
                case 4:
                  return [2, s]
              }
            }))
          }))
        }

        function u(t, e) {
          function n(n) {
            return (0, r.mG)(this, void 0, Promise, (function() {
              var s;
              return (0, r.Jh)(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return s = !1, [4, t({
                      payload: (0, o.D)(n.event, {
                        clone: !0,
                        traverse: !1
                      }),
                      integrations: null != e ? e : {},
                      next: function(t) {
                        s = !0, t && (n.event = t.obj)
                      }
                    })];
                  case 1:
                    if (r.sent(), !s) throw new i.Y({
                      retry: !1,
                      type: "middleware_cancellation",
                      reason: "Middleware `next` function skipped"
                    });
                    return [2, n]
                }
              }))
            }))
          }
          return {
            name: "Source Middleware ".concat(t.name),
            type: "before",
            version: "0.1.0",
            isLoaded: function() {
              return !0
            },
            load: function(t) {
              return Promise.resolve(t)
            },
            track: n,
            page: n,
            identify: n,
            alias: n,
            group: n
          }
        }
      },
      5163: function(t, e, n) {
        "use strict";
        n.d(e, {
          Jh: function() {
            return a
          },
          ZT: function() {
            return i
          },
          _T: function() {
            return s
          },
          ev: function() {
            return c
          },
          mG: function() {
            return u
          },
          pi: function() {
            return o
          }
        });
        var r = function(t, e) {
          return r = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(t, e) {
            t.__proto__ = e
          } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
          }, r(t, e)
        };

        function i(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");

          function n() {
            this.constructor = t
          }
          r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
        }
        var o = function() {
          return o = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
          }, o.apply(this, arguments)
        };

        function s(t, e) {
          var n = {};
          for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
          if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(t); i < r.length; i++) e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]])
          }
          return n
        }

        function u(t, e, n, r) {
          return new(n || (n = Promise))((function(i, o) {
            function s(t) {
              try {
                a(r.next(t))
              } catch (t) {
                o(t)
              }
            }

            function u(t) {
              try {
                a(r.throw(t))
              } catch (t) {
                o(t)
              }
            }

            function a(t) {
              var e;
              t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n((function(t) {
                t(e)
              }))).then(s, u)
            }
            a((r = r.apply(t, e || [])).next())
          }))
        }

        function a(t, e) {
          var n, r, i, o, s = {
            label: 0,
            sent: function() {
              if (1 & i[0]) throw i[1];
              return i[1]
            },
            trys: [],
            ops: []
          };
          return o = {
            next: u(0),
            throw: u(1),
            return: u(2)
          }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
          }), o;

          function u(u) {
            return function(a) {
              return function(u) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; o && (o = 0, u[0] && (s = 0)), s;) try {
                  if (n = 1, r && (i = 2 & u[0] ? r.return : u[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, u[1])).done) return i;
                  switch (r = 0, i && (u = [2 & u[0], i.value]), u[0]) {
                    case 0:
                    case 1:
                      i = u;
                      break;
                    case 4:
                      return s.label++, {
                        value: u[1],
                        done: !1
                      };
                    case 5:
                      s.label++, r = u[1], u = [0];
                      continue;
                    case 7:
                      u = s.ops.pop(), s.trys.pop();
                      continue;
                    default:
                      if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== u[0] && 2 !== u[0])) {
                        s = 0;
                        continue
                      }
                      if (3 === u[0] && (!i || u[1] > i[0] && u[1] < i[3])) {
                        s.label = u[1];
                        break
                      }
                      if (6 === u[0] && s.label < i[1]) {
                        s.label = i[1], i = u;
                        break
                      }
                      if (i && s.label < i[2]) {
                        s.label = i[2], s.ops.push(u);
                        break
                      }
                      i[2] && s.ops.pop(), s.trys.pop();
                      continue
                  }
                  u = e.call(t, s)
                } catch (t) {
                  u = [6, t], r = 0
                } finally {
                  n = i = 0
                }
                if (5 & u[0]) throw u[1];
                return {
                  value: u[0] ? u[1] : void 0,
                  done: !0
                }
              }([u, a])
            }
          }
        }
        Object.create;

        function c(t, e, n) {
          if (n || 2 === arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++) !r && i in e || (r || (r = Array.prototype.slice.call(e, 0, i)), r[i] = e[i]);
          return t.concat(r || Array.prototype.slice.call(e))
        }
        Object.create
      },
      888: function(t, e, n) {
        "use strict";

        function r(t, e) {
          return new Promise((function(n, r) {
            var i = setTimeout((function() {
              r(Error("Promise timed out"))
            }), e);
            t.then((function(t) {
              return clearTimeout(i), n(t)
            })).catch(r)
          }))
        }

        function i(t, e, n) {
          var i;
          return (i = n, new Promise((function(t) {
            return setTimeout(t, i)
          }))).then((function() {
            return r(function() {
              try {
                return Promise.resolve(e(t))
              } catch (t) {
                return Promise.reject(t)
              }
            }(), 1e3)
          })).catch((function(e) {
            null == t || t.log("warn", "Callback Error", {
              error: e
            }), null == t || t.stats.increment("callback_error")
          })).then((function() {
            return t
          }))
        }
        n.d(e, {
          FJ: function() {
            return r
          },
          UI: function() {
            return i
          }
        })
      },
      1494: function(t, e, n) {
        "use strict";
        n.d(e, {
          Y: function() {
            return a
          },
          _: function() {
            return c
          }
        });
        var r = n(7831),
          i = n(380),
          o = n(5163),
          s = function() {
            function t() {
              this._logs = []
            }
            return t.prototype.log = function(t, e, n) {
              var r = new Date;
              this._logs.push({
                level: t,
                message: e,
                time: r,
                extras: n
              })
            }, Object.defineProperty(t.prototype, "logs", {
              get: function() {
                return this._logs
              },
              enumerable: !1,
              configurable: !0
            }), t.prototype.flush = function() {
              if (this.logs.length > 1) {
                var t = this._logs.reduce((function(t, e) {
                  var n, r, i, s = (0, o.pi)((0, o.pi)({}, e), {
                    json: JSON.stringify(e.extras, null, " "),
                    extras: e.extras
                  });
                  delete s.time;
                  var u = null !== (i = null === (r = e.time) || void 0 === r ? void 0 : r.toISOString()) && void 0 !== i ? i : "";
                  return t[u] && (u = "".concat(u, "-").concat(Math.random())), (0, o.pi)((0, o.pi)({}, t), ((n = {})[u] = s, n))
                }), {});
                console.table ? console.table(t) : console.log(t)
              } else this.logs.forEach((function(t) {
                var e = t.level,
                  n = t.message,
                  r = t.extras;
                "info" === e || "debug" === e ? console.log(n, null != r ? r : "") : console[e](n, null != r ? r : "")
              }));
              this._logs = []
            }, t
          }(),
          u = n(417),
          a = function(t) {
            var e, n, r;
            this.retry = null === (e = t.retry) || void 0 === e || e, this.type = null !== (n = t.type) && void 0 !== n ? n : "plugin Error", this.reason = null !== (r = t.reason) && void 0 !== r ? r : ""
          },
          c = function() {
            function t(t, e, n, i) {
              void 0 === e && (e = (0, r.v4)()), void 0 === n && (n = new u.i), void 0 === i && (i = new s), this.attempts = 0, this.event = t, this._id = e, this.logger = i, this.stats = n
            }
            return t.system = function() {}, t.prototype.isSame = function(t) {
              return t.id === this.id
            }, t.prototype.cancel = function(t) {
              if (t) throw t;
              throw new a({
                reason: "Context Cancel"
              })
            }, t.prototype.log = function(t, e, n) {
              this.logger.log(t, e, n)
            }, Object.defineProperty(t.prototype, "id", {
              get: function() {
                return this._id
              },
              enumerable: !1,
              configurable: !0
            }), t.prototype.updateEvent = function(t, e) {
              var n;
              if ("integrations" === t.split(".")[0]) {
                var r = t.split(".")[1];
                if (!1 === (null === (n = this.event.integrations) || void 0 === n ? void 0 : n[r])) return this.event
              }
              return (0, i.N)(this.event, t, e), this.event
            }, t.prototype.failedDelivery = function() {
              return this._failedDelivery
            }, t.prototype.setFailedDelivery = function(t) {
              this._failedDelivery = t
            }, t.prototype.logs = function() {
              return this.logger.logs
            }, t.prototype.flush = function() {
              this.logger.flush(), this.stats.flush()
            }, t.prototype.toJSON = function() {
              return {
                id: this._id,
                event: this.event,
                logs: this.logger.logs,
                metrics: this.stats.metrics
              }
            }, t
          }()
      },
      3098: function(t, e, n) {
        "use strict";
        n.d(e, {
          M: function() {
            return o
          },
          Z: function() {
            return s
          }
        });
        var r = n(5163),
          i = n(7830);
        var o = "onRemoveFromFuture",
          s = function(t) {
            function e(e, n, r) {
              var i = t.call(this) || this;
              return i.future = [], i.maxAttempts = e, i.queue = n, i.seen = null != r ? r : {}, i
            }
            return (0, r.ZT)(e, t), e.prototype.push = function() {
              for (var t = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
              var r = e.map((function(e) {
                return !(t.updateAttempts(e) > t.maxAttempts || t.includes(e)) && (t.queue.push(e), !0)
              }));
              return this.queue = this.queue.sort((function(e, n) {
                return t.getAttempts(e) - t.getAttempts(n)
              })), r
            }, e.prototype.pushWithBackoff = function(t) {
              var e = this;
              if (0 === this.getAttempts(t)) return this.push(t)[0];
              var n = this.updateAttempts(t);
              if (n > this.maxAttempts || this.includes(t)) return !1;
              var r = function(t) {
                var e = Math.random() + 1,
                  n = t.minTimeout,
                  r = void 0 === n ? 500 : n,
                  i = t.factor,
                  o = void 0 === i ? 2 : i,
                  s = t.attempt,
                  u = t.maxTimeout,
                  a = void 0 === u ? 1 / 0 : u;
                return Math.min(e * r * Math.pow(o, s), a)
              }({
                attempt: n - 1
              });
              return setTimeout((function() {
                e.queue.push(t), e.future = e.future.filter((function(e) {
                  return e.id !== t.id
                })), e.emit(o)
              }), r), this.future.push(t), !0
            }, e.prototype.getAttempts = function(t) {
              var e;
              return null !== (e = this.seen[t.id]) && void 0 !== e ? e : 0
            }, e.prototype.updateAttempts = function(t) {
              return this.seen[t.id] = this.getAttempts(t) + 1, this.getAttempts(t)
            }, e.prototype.includes = function(t) {
              return this.queue.includes(t) || this.future.includes(t) || Boolean(this.queue.find((function(e) {
                return e.id === t.id
              }))) || Boolean(this.future.find((function(e) {
                return e.id === t.id
              })))
            }, e.prototype.pop = function() {
              return this.queue.shift()
            }, Object.defineProperty(e.prototype, "length", {
              get: function() {
                return this.queue.length
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(e.prototype, "todo", {
              get: function() {
                return this.queue.length + this.future.length
              },
              enumerable: !1,
              configurable: !0
            }), e
          }(i.Q)
      },
      6096: function(t, e, n) {
        "use strict";
        n.d(e, {
          a: function() {
            return o
          },
          z: function() {
            return s
          }
        });
        var r = n(5163),
          i = n(1494);

        function o(t, e) {
          t.log("debug", "plugin", {
            plugin: e.name
          });
          var n = (new Date).getTime(),
            o = e[t.event.type];
          return void 0 === o ? Promise.resolve(t) : function(t) {
            return (0, r.mG)(this, void 0, void 0, (function() {
              var e;
              return (0, r.Jh)(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([0, 2, , 3]), [4, t()];
                  case 1:
                    return [2, n.sent()];
                  case 2:
                    return e = n.sent(), [2, Promise.reject(e)];
                  case 3:
                    return [2]
                }
              }))
            }))
          }((function() {
            return o.apply(e, [t])
          })).then((function(t) {
            var r = (new Date).getTime() - n;
            return t.stats.gauge("plugin_time", r, ["plugin:".concat(e.name)]), t
          })).catch((function(n) {
            if (n instanceof i.Y && "middleware_cancellation" === n.type) throw n;
            return n instanceof i.Y ? (t.log("warn", n.type, {
              plugin: e.name,
              error: n
            }), n) : (t.log("error", "plugin Error", {
              plugin: e.name,
              error: n
            }), t.stats.increment("plugin_error", 1, ["plugin:".concat(e.name)]), n)
          }))
        }

        function s(t, e) {
          return o(t, e).then((function(e) {
            if (e instanceof i._) return e;
            t.log("debug", "Context canceled"), t.stats.increment("context_canceled"), t.cancel(e)
          }))
        }
      },
      417: function(t, e, n) {
        "use strict";
        n.d(e, {
          i: function() {
            return o
          },
          s: function() {
            return i
          }
        });
        var r = n(5163),
          i = function() {
            function t() {
              this.metrics = []
            }
            return t.prototype.increment = function(t, e, n) {
              void 0 === e && (e = 1), this.metrics.push({
                metric: t,
                value: e,
                tags: null != n ? n : [],
                type: "counter",
                timestamp: Date.now()
              })
            }, t.prototype.gauge = function(t, e, n) {
              this.metrics.push({
                metric: t,
                value: e,
                tags: null != n ? n : [],
                type: "gauge",
                timestamp: Date.now()
              })
            }, t.prototype.flush = function() {
              var t = this.metrics.map((function(t) {
                return (0, r.pi)((0, r.pi)({}, t), {
                  tags: t.tags.join(",")
                })
              }));
              console.table ? console.table(t) : console.log(t), this.metrics = []
            }, t.prototype.serialize = function() {
              return this.metrics.map((function(t) {
                return {
                  m: t.metric,
                  v: t.value,
                  t: t.tags,
                  k: (e = t.type, {
                    gauge: "g",
                    counter: "c"
                  } [e]),
                  e: t.timestamp
                };
                var e
              }))
            }, t
          }(),
          o = function(t) {
            function e() {
              return null !== t && t.apply(this, arguments) || this
            }
            return (0, r.ZT)(e, t), e.prototype.gauge = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
            }, e.prototype.increment = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
            }, e.prototype.flush = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
            }, e.prototype.serialize = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
              return []
            }, e
          }(i)
      },
      7595: function(t, e, n) {
        "use strict";

        function r(t) {
          return "string" == typeof t
        }

        function i(t) {
          return "number" == typeof t
        }

        function o(t) {
          return "function" == typeof t
        }

        function s(t) {
          return null != t
        }

        function u(t) {
          return "object" === Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
        }
        n.d(e, {
          Gg: function() {
            return s
          },
          HD: function() {
            return r
          },
          PO: function() {
            return u
          },
          hj: function() {
            return i
          },
          mf: function() {
            return o
          }
        })
      },
      7848: function(t, e, n) {
        "use strict";
        n.d(e, {
          d: function() {
            return r
          }
        });
        var r = function() {
          var t, e, n = !1,
            r = new Promise((function(r, i) {
              t = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                n = !0, r.apply(void 0, t)
              }, e = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                n = !0, i.apply(void 0, t)
              }
            }));
          return {
            resolve: t,
            reject: e,
            promise: r,
            isSettled: function() {
              return n
            }
          }
        }
      },
      7830: function(t, e, n) {
        "use strict";
        n.d(e, {
          Q: function() {
            return r
          }
        });
        var r = function() {
          function t(t) {
            var e;
            this.callbacks = {}, this.warned = !1, this.maxListeners = null !== (e = null == t ? void 0 : t.maxListeners) && void 0 !== e ? e : 10
          }
          return t.prototype.warnIfPossibleMemoryLeak = function(t) {
            this.warned || this.maxListeners && this.callbacks[t].length > this.maxListeners && (console.warn("Event Emitter: Possible memory leak detected; ".concat(String(t), " has exceeded ").concat(this.maxListeners, " listeners.")), this.warned = !0)
          }, t.prototype.on = function(t, e) {
            return this.callbacks[t] ? (this.callbacks[t].push(e), this.warnIfPossibleMemoryLeak(t)) : this.callbacks[t] = [e], this
          }, t.prototype.once = function(t, e) {
            var n = this,
              r = function() {
                for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                n.off(t, r), e.apply(n, i)
              };
            return this.on(t, r), this
          }, t.prototype.off = function(t, e) {
            var n, r = (null !== (n = this.callbacks[t]) && void 0 !== n ? n : []).filter((function(t) {
              return t !== e
            }));
            return this.callbacks[t] = r, this
          }, t.prototype.emit = function(t) {
            for (var e, n = this, r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
            var o = null !== (e = this.callbacks[t]) && void 0 !== e ? e : [];
            return o.forEach((function(t) {
              t.apply(n, r)
            })), this
          }, t
        }()
      },
      7831: function(t, e, n) {
        "use strict";
        n.d(e, {
          v4: function() {
            return s
          }
        });
        for (var r, i = 256, o = []; i--;) o[i] = (i + 256).toString(16).substring(1);

        function s() {
          var t, e = 0,
            n = "";
          if (!r || i + 16 > 256) {
            for (r = Array(e = 256); e--;) r[e] = 256 * Math.random() | 0;
            e = i = 0
          }
          for (; e < 16; e++) t = r[i + e], n += 6 == e ? o[15 & t | 64] : 8 == e ? o[63 & t | 128] : o[t], 1 & e && e > 1 && e < 11 && (n += "-");
          return i++, n
        }
      },
      380: function(t, e, n) {
        "use strict";

        function r(t, e, n) {
          e.split && (e = e.split("."));
          for (var r, i, o = 0, s = e.length, u = t; o < s && "__proto__" !== (i = e[o++]) && "constructor" !== i && "prototype" !== i;) u = u[i] = o === s ? n : typeof(r = u[i]) == typeof e ? r : 0 * e[o] != 0 || ~("" + e[o]).indexOf(".") ? {} : []
        }
        n.d(e, {
          N: function() {
            return r
          }
        })
      }
    },
    o = {};

  function s(t) {
    var e = o[t];
    if (void 0 !== e) return e.exports;
    var n = o[t] = {
      exports: {}
    };
    return i[t].call(n.exports, n, n.exports, s), n.exports
  }
  s.m = i, s.n = function(t) {
      var e = t && t.__esModule ? function() {
        return t.default
      } : function() {
        return t
      };
      return s.d(e, {
        a: e
      }), e
    }, e = Object.getPrototypeOf ? function(t) {
      return Object.getPrototypeOf(t)
    } : function(t) {
      return t.__proto__
    }, s.t = function(n, r) {
      if (1 & r && (n = this(n)), 8 & r) return n;
      if ("object" == typeof n && n) {
        if (4 & r && n.__esModule) return n;
        if (16 & r && "function" == typeof n.then) return n
      }
      var i = Object.create(null);
      s.r(i);
      var o = {};
      t = t || [null, e({}), e([]), e(e)];
      for (var u = 2 & r && n;
        "object" == typeof u && !~t.indexOf(u); u = e(u)) Object.getOwnPropertyNames(u).forEach((function(t) {
        o[t] = function() {
          return n[t]
        }
      }));
      return o.default = function() {
        return n
      }, s.d(i, o), i
    }, s.d = function(t, e) {
      for (var n in e) s.o(e, n) && !s.o(t, n) && Object.defineProperty(t, n, {
        enumerable: !0,
        get: e[n]
      })
    }, s.f = {}, s.e = function(t) {
      return Promise.all(Object.keys(s.f).reduce((function(e, n) {
        return s.f[n](t, e), e
      }), []))
    }, s.u = function(t) {
      return ({
        96: "queryString",
        119: "auto-track",
        150: "legacyVideos",
        214: "remoteMiddleware",
        464: "ajs-destination",
        493: "schemaFilter",
        604: "tsub-middleware"
      } [t] || t) + ".bundle." + {
        96: "5949e6e86feb5312385b",
        119: "a9d7db192bb0f8beb329",
        150: "611314fd74bde9f21947",
        214: "366df96a78421ccf3f3e",
        464: "196edae455b4fdcecd90",
        493: "5c2661f67b4b71a6d9bd",
        604: "77315eced46c5ae4c052",
        799: "3370767d4bbb423fe139",
        870: "6e2976b75e60ab2b2bf8"
      } [t] + ".js"
    }, s.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, n = {}, r = "@segment/analytics-next:", s.l = function(t, e, i, o) {
      if (n[t]) n[t].push(e);
      else {
        var u, a;
        if (void 0 !== i)
          for (var c = document.getElementsByTagName("script"), l = 0; l < c.length; l++) {
            var f = c[l];
            if (f.getAttribute("src") == t || f.getAttribute("data-webpack") == r + i) {
              u = f;
              break
            }
          }
        u || (a = !0, (u = document.createElement("script")).charset = "utf-8", u.timeout = 120, s.nc && u.setAttribute("nonce", s.nc), u.setAttribute("data-webpack", r + i), u.src = t), n[t] = [e];
        var p = function(e, r) {
            u.onerror = u.onload = null, clearTimeout(d);
            var i = n[t];
            if (delete n[t], u.parentNode && u.parentNode.removeChild(u), i && i.forEach((function(t) {
                return t(r)
              })), e) return e(r)
          },
          d = setTimeout(p.bind(null, void 0, {
            type: "timeout",
            target: u
          }), 12e4);
        u.onerror = p.bind(null, u.onerror), u.onload = p.bind(null, u.onload), a && document.head.appendChild(u)
      }
    }, s.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, s.p = "",
    function() {
      var t = {
        610: 0
      };
      s.f.j = function(e, n) {
        var r = s.o(t, e) ? t[e] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else {
            var i = new Promise((function(n, i) {
              r = t[e] = [n, i]
            }));
            n.push(r[2] = i);
            var o = s.p + s.u(e),
              u = new Error;
            s.l(o, (function(n) {
              if (s.o(t, e) && (0 !== (r = t[e]) && (t[e] = void 0), r)) {
                var i = n && ("load" === n.type ? "missing" : n.type),
                  o = n && n.target && n.target.src;
                u.message = "Loading chunk " + e + " failed.\n(" + i + ": " + o + ")", u.name = "ChunkLoadError", u.type = i, u.request = o, r[1](u)
              }
            }), "chunk-" + e, e)
          }
      };
      var e = function(e, n) {
          var r, i, o = n[0],
            u = n[1],
            a = n[2],
            c = 0;
          if (o.some((function(e) {
              return 0 !== t[e]
            }))) {
            for (r in u) s.o(u, r) && (s.m[r] = u[r]);
            if (a) a(s)
          }
          for (e && e(n); c < o.length; c++) i = o[c], s.o(t, i) && t[i] && t[i][0](), t[i] = 0
        },
        n = self.webpackChunk_segment_analytics_next = self.webpackChunk_segment_analytics_next || [];
      n.forEach(e.bind(null, 0)), n.push = e.bind(null, n.push.bind(n))
    }();
  var u = {};
  ! function() {
    "use strict";
    s.r(u);
    var t = s(5163),
      e = s(7566),
      n = s(6175);

    function r() {
      return "undefined" != typeof process && process.env ? process.env : {}
    }
    var i = s(4759),
      o = s(7595);

    function a(t, e, n, r) {
      var i, s = [t, e, n, r],
        u = (0, o.PO)(t) ? t.event : t;
      if (!u || !(0, o.HD)(u)) throw new Error("Event missing");
      var a = (0, o.PO)(t) ? null !== (i = t.properties) && void 0 !== i ? i : {} : (0, o.PO)(e) ? e : {},
        c = {};
      return (0, o.mf)(n) || (c = null != n ? n : {}), (0, o.PO)(t) && !(0, o.mf)(e) && (c = null != e ? e : {}), [u, a, c, s.find(o.mf)]
    }

    function c(t, e, n, r, i) {
      var s, u, a = null,
        c = null,
        l = [t, e, n, r, i],
        f = l.filter(o.HD);
      void 0 !== f[0] && void 0 !== f[1] && (a = f[0], c = f[1]), 1 === f.length && (a = null, c = f[0]);
      var p = l.find(o.mf),
        d = l.filter((function(t) {
          return null === c ? (0, o.PO)(t) : (0, o.PO)(t) || null === t
        })),
        h = null !== (s = d[0]) && void 0 !== s ? s : {},
        v = null !== (u = d[1]) && void 0 !== u ? u : {};
      return [a, c, h, v, p]
    }
    var l = function(t) {
      return function() {
        for (var e, n, r, i = [], s = 0; s < arguments.length; s++) i[s] = arguments[s];
        for (var u = {}, a = ["callback", "options", "traits", "id"], c = 0, l = i; c < l.length; c++) {
          var f = l[c],
            p = a.pop();
          if ("id" === p) {
            if ((0, o.HD)(f) || (0, o.hj)(f)) {
              u.id = f.toString();
              continue
            }
            if (null == f) continue;
            p = a.pop()
          }
          if ("traits" !== p && "options" !== p || null != f && !(0, o.PO)(f) || (u[p] = f), (0, o.mf)(f)) {
            u.callback = f;
            break
          }
        }
        return [null !== (e = u.id) && void 0 !== e ? e : t.id(), null !== (n = u.traits) && void 0 !== n ? n : {}, null !== (r = u.options) && void 0 !== r ? r : {}, u.callback]
      }
    };

    function f(t, e, n, r) {
      (0, o.hj)(t) && (t = t.toString()), (0, o.hj)(e) && (e = e.toString());
      var i = [t, e, n, r],
        s = i.filter(o.HD),
        u = s[0],
        a = void 0 === u ? t : u,
        c = s[1],
        l = void 0 === c ? null : c,
        f = i.filter(o.PO)[0];
      return [a, l, void 0 === f ? {} : f, i.find(o.mf)]
    }
    var p = s(94),
      d = s(8404),
      h = s(888);

    function v(e, n, r, i) {
      return (0, t.mG)(this, void 0, void 0, (function() {
        var o, s;
        return (0, t.Jh)(this, (function(t) {
          switch (t.label) {
            case 0:
              return r.emit("dispatch_start", e), o = Date.now(), n.isEmpty() ? [4, n.dispatchSingle(e)] : [3, 2];
            case 1:
              return s = t.sent(), [3, 4];
            case 2:
              return [4, n.dispatch(e)];
            case 3:
              s = t.sent(), t.label = 4;
            case 4:
              return (null == i ? void 0 : i.callback) ? [4, (0, h.UI)(s, i.callback, (u = o, a = i.timeout, c = Date.now() - u, Math.max((null != a ? a : 300) - c, 0)))] : [3, 6];
            case 5:
              s = t.sent(), t.label = 6;
            case 6:
              return (null == i ? void 0 : i.debug) && s.flush(), [2, s]
          }
          var u, a, c
        }))
      }))
    }
    var y = s(7830),
      m = s(7831),
      g = s(380),
      b = s(4791),
      w = s.n(b);
    var _ = function(t, e, n, r, i, o) {
        return {
          __t: "bpc",
          c: e,
          p: r,
          u: t,
          s: n,
          t: i,
          r: o
        }
      },
      x = Object.keys(_("", "", "", "", "", ""));
    var S = function(t) {
        var e, n, r = t.c,
          i = t.p,
          o = t.s,
          s = t.u,
          u = t.r,
          a = t.t,
          c = r ? function(t) {
            try {
              return new URL(t).pathname
            } catch (e) {
              return "/" === t[0] ? t : "/" + t
            }
          }(r) : i,
          l = r ? function(t, e) {
            return t.indexOf("?") > -1 ? t : t + e
          }(r, o) : -1 === (n = (e = s).indexOf("#")) ? e : e.slice(0, n);
        return {
          path: c,
          referrer: u,
          search: o,
          title: a,
          url: l
        }
      },
      P = function() {
        var t = document.querySelector("link[rel='canonical']");
        return _(location.href, t && t.getAttribute("href") || void 0, location.search, location.pathname, document.title, document.referrer)
      },
      j = function(e, n) {
        void 0 === n && (n = S(P()));
        var r, i, o, s = e.context;
        "page" === e.type && (r = e.properties && (i = e.properties, o = Object.keys(n), Object.assign.apply(Object, (0, t.ev)([{}], o.map((function(t) {
          var e;
          if (i && Object.prototype.hasOwnProperty.call(i, t)) return (e = {})[t] = i[t], e
        })), !1))), e.properties = (0, t.pi)((0, t.pi)((0, t.pi)({}, n), e.properties), e.name ? {
          name: e.name
        } : {})), s.page = (0, t.pi)((0, t.pi)((0, t.pi)({}, n), r), s.page)
      },
      I = function() {
        function e(t) {
          this.user = t
        }
        return e.prototype.track = function(e, n, r, i, o) {
          return this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), {
            event: e,
            type: "track",
            properties: n,
            options: (0, t.pi)({}, r),
            integrations: (0, t.pi)({}, i)
          }), o)
        }, e.prototype.page = function(e, n, r, i, o, s) {
          var u, a = {
            type: "page",
            properties: (0, t.pi)({}, r),
            options: (0, t.pi)({}, i),
            integrations: (0, t.pi)({}, o)
          };
          return null !== e && (a.category = e, a.properties = null !== (u = a.properties) && void 0 !== u ? u : {}, a.properties.category = e), null !== n && (a.name = n), this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), a), s)
        }, e.prototype.screen = function(e, n, r, i, o, s) {
          var u = {
            type: "screen",
            properties: (0, t.pi)({}, r),
            options: (0, t.pi)({}, i),
            integrations: (0, t.pi)({}, o)
          };
          return null !== e && (u.category = e), null !== n && (u.name = n), this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), u), s)
        }, e.prototype.identify = function(e, n, r, i, o) {
          return this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), {
            type: "identify",
            userId: e,
            traits: n,
            options: (0, t.pi)({}, r),
            integrations: (0, t.pi)({}, i)
          }), o)
        }, e.prototype.group = function(e, n, r, i, o) {
          return this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), {
            type: "group",
            traits: n,
            options: (0, t.pi)({}, r),
            integrations: (0, t.pi)({}, i),
            groupId: e
          }), o)
        }, e.prototype.alias = function(e, n, r, i, o) {
          var s = {
            userId: e,
            type: "alias",
            options: (0, t.pi)({}, r),
            integrations: (0, t.pi)({}, i)
          };
          return null !== n && (s.previousId = n), void 0 === e ? this.normalize((0, t.pi)((0, t.pi)({}, s), this.baseEvent())) : this.normalize((0, t.pi)((0, t.pi)({}, this.baseEvent()), s), o)
        }, e.prototype.baseEvent = function() {
          var t = {
              integrations: {},
              options: {}
            },
            e = this.user;
          return e.id() && (t.userId = e.id()), e.anonymousId() && (t.anonymousId = e.anonymousId()), t
        }, e.prototype.context = function(t) {
          var e, n, r, i = ["integrations", "anonymousId", "timestamp", "userId"],
            o = null !== (e = t.options) && void 0 !== e ? e : {};
          delete o.integrations;
          var s = Object.keys(o),
            u = null !== (r = null === (n = t.options) || void 0 === n ? void 0 : n.context) && void 0 !== r ? r : {},
            a = {};
          return s.forEach((function(t) {
            "context" !== t && (i.includes(t) ? (0, g.N)(a, t, o[t]) : (0, g.N)(u, t, o[t]))
          })), [u, a]
        }, e.prototype.normalize = function(e, n) {
          var r, i, o;
          (null === (r = e.options) || void 0 === r ? void 0 : r.anonymousId) && this.user.anonymousId(e.options.anonymousId);
          var s = Object.keys(null !== (i = e.integrations) && void 0 !== i ? i : {}).reduce((function(n, r) {
              var i, o;
              return (0, t.pi)((0, t.pi)({}, n), ((i = {})[r] = Boolean(null === (o = e.integrations) || void 0 === o ? void 0 : o[r]), i))
            }), {}),
            u = (0, t.pi)((0, t.pi)({}, s), null === (o = e.options) || void 0 === o ? void 0 : o.integrations),
            a = this.context(e),
            c = a[0],
            l = a[1],
            f = (e.options, (0, t._T)(e, ["options"])),
            p = (0, t.pi)((0, t.pi)((0, t.pi)((0, t.pi)({
              timestamp: new Date
            }, f), {
              context: c,
              integrations: u
            }), l), {
              messageId: "ajs-next-" + w().hash(JSON.stringify(e) + (0, m.v4)())
            });
          return j(p, n), p
        }, e
      }(),
      O = s(3061);
    var k = s(3098),
      A = s(1494),
      M = s(6096),
      E = function(e) {
        function n(t) {
          var n, r, i, o = e.call(this) || this;
          return o.criticalTasks = (i = 0, {
            done: function() {
              return n
            },
            run: function(t) {
              var e, o = t();
              return "object" == typeof(e = o) && null !== e && "then" in e && "function" == typeof e.then && (1 == ++i && (n = new Promise((function(t) {
                return r = t
              }))), o.finally((function() {
                return 0 == --i && r()
              }))), o
            }
          }), o.plugins = [], o.failedInitializations = [], o.flushing = !1, o.queue = t, o.queue.on(k.M, (function() {
            o.scheduleFlush(0)
          })), o
        }
        return (0, t.ZT)(n, e), n.prototype.register = function(e, n, r) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var i = this;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return "destination" !== n.type || "Segment.io" === n.name ? [3, 1] : (n.load(e, r).catch((function(t) {
                    i.failedInitializations.push(n.name), i.emit("initialization_failure", n), console.warn(n.name, t), e.log("warn", "Failed to load destination", {
                      plugin: n.name,
                      error: t
                    }), i.plugins = i.plugins.filter((function(t) {
                      return t === n
                    }))
                  })), [3, 3]);
                case 1:
                  return [4, n.load(e, r)];
                case 2:
                  t.sent(), t.label = 3;
                case 3:
                  return this.plugins.push(n), [2]
              }
            }))
          }))
        }, n.prototype.deregister = function(e, n, r) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var i;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return t.trys.push([0, 3, , 4]), n.unload ? [4, Promise.resolve(n.unload(e, r))] : [3, 2];
                case 1:
                  t.sent(), t.label = 2;
                case 2:
                  return this.plugins = this.plugins.filter((function(t) {
                    return t.name !== n.name
                  })), [3, 4];
                case 3:
                  return i = t.sent(), e.log("warn", "Failed to unload destination", {
                    plugin: n.name,
                    error: i
                  }), [3, 4];
                case 4:
                  return [2]
              }
            }))
          }))
        }, n.prototype.dispatch = function(e) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var n;
            return (0, t.Jh)(this, (function(t) {
              return e.log("debug", "Dispatching"), e.stats.increment("message_dispatched"), this.queue.push(e), n = this.subscribeToDelivery(e), this.scheduleFlush(0), [2, n]
            }))
          }))
        }, n.prototype.subscribeToDelivery = function(e) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var n = this;
            return (0, t.Jh)(this, (function(t) {
              return [2, new Promise((function(t) {
                var r = function(i, o) {
                  i.isSame(e) && (n.off("flush", r), t(i))
                };
                n.on("flush", r)
              }))]
            }))
          }))
        }, n.prototype.dispatchSingle = function(e) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var n = this;
            return (0, t.Jh)(this, (function(t) {
              return e.log("debug", "Dispatching"), e.stats.increment("message_dispatched"), this.queue.updateAttempts(e), e.attempts = 1, [2, this.deliver(e).catch((function(t) {
                return n.enqueuRetry(t, e) ? n.subscribeToDelivery(e) : (e.setFailedDelivery({
                  reason: t
                }), e)
              }))]
            }))
          }))
        }, n.prototype.isEmpty = function() {
          return 0 === this.queue.length
        }, n.prototype.scheduleFlush = function(t) {
          var e = this;
          void 0 === t && (t = 500), this.flushing || (this.flushing = !0, setTimeout((function() {
            e.flush().then((function() {
              setTimeout((function() {
                e.flushing = !1, e.queue.length && e.scheduleFlush(0)
              }), 0)
            }))
          }), t))
        }, n.prototype.deliver = function(e) {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var n, r, i, o;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return [4, this.criticalTasks.done()];
                case 1:
                  t.sent(), n = Date.now(), t.label = 2;
                case 2:
                  return t.trys.push([2, 4, , 5]), [4, this.flushOne(e)];
                case 3:
                  return e = t.sent(), r = Date.now() - n, this.emit("delivery_success", e), e.stats.gauge("delivered", r), e.log("debug", "Delivered", e.event), [2, e];
                case 4:
                  throw i = t.sent(), o = i, e.log("error", "Failed to deliver", o), this.emit("delivery_failure", e, o), e.stats.increment("delivery_failed"), i;
                case 5:
                  return [2]
              }
            }))
          }))
        }, n.prototype.enqueuRetry = function(t, e) {
          return !(t instanceof A.Y && !t.retry) && this.queue.pushWithBackoff(e)
        }, n.prototype.flush = function() {
          return (0, t.mG)(this, void 0, void 0, (function() {
            var e, n;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  if (0 === this.queue.length) return [2, []];
                  if (!(e = this.queue.pop())) return [2, []];
                  e.attempts = this.queue.getAttempts(e), t.label = 1;
                case 1:
                  return t.trys.push([1, 3, , 4]), [4, this.deliver(e)];
                case 2:
                  return e = t.sent(), this.emit("flush", e, !0), [3, 4];
                case 3:
                  return n = t.sent(), this.enqueuRetry(n, e) || (e.setFailedDelivery({
                    reason: n
                  }), this.emit("flush", e, !1)), [2, []];
                case 4:
                  return [2, [e]]
              }
            }))
          }))
        }, n.prototype.isReady = function() {
          return !0
        }, n.prototype.availableExtensions = function(e) {
          var n, r, i = this.plugins.filter((function(t) {
              var n, r, i;
              if ("destination" !== t.type && "Segment.io" !== t.name) return !0;
              var o = void 0;
              return null === (n = t.alternativeNames) || void 0 === n || n.forEach((function(t) {
                void 0 !== e[t] && (o = e[t])
              })), null !== (i = null !== (r = e[t.name]) && void 0 !== r ? r : o) && void 0 !== i ? i : !1 !== ("Segment.io" === t.name || e.All)
            })),
            o = (n = "type", r = {}, i.forEach((function(e) {
              var i, o = void 0;
              if ("string" == typeof n) {
                var s = e[n];
                o = "string" != typeof s ? JSON.stringify(s) : s
              } else n instanceof Function && (o = n(e));
              void 0 !== o && (r[o] = (0, t.ev)((0, t.ev)([], null !== (i = r[o]) && void 0 !== i ? i : [], !0), [e], !1))
            })), r),
            s = o.before,
            u = void 0 === s ? [] : s,
            a = o.enrichment,
            c = void 0 === a ? [] : a,
            l = o.destination,
            f = void 0 === l ? [] : l,
            p = o.after;
          return {
            before: u,
            enrichment: c,
            destinations: f,
            after: void 0 === p ? [] : p
          }
        }, n.prototype.flushOne = function(e) {
          var n, r;
          return (0, t.mG)(this, void 0, void 0, (function() {
            var i, o, s, u, a, c, l, f, p, d, h, v, y, m;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  if (!this.isReady()) throw new Error("Not ready");
                  e.attempts > 1 && this.emit("delivery_retry", e), i = this.availableExtensions(null !== (n = e.event.integrations) && void 0 !== n ? n : {}), o = i.before, s = i.enrichment, u = 0, a = o, t.label = 1;
                case 1:
                  return u < a.length ? (c = a[u], [4, (0, M.z)(e, c)]) : [3, 4];
                case 2:
                  (d = t.sent()) instanceof A._ && (e = d), this.emit("message_enriched", e, c), t.label = 3;
                case 3:
                  return u++, [3, 1];
                case 4:
                  l = 0, f = s, t.label = 5;
                case 5:
                  return l < f.length ? (p = f[l], [4, (0, M.a)(e, p)]) : [3, 8];
                case 6:
                  (d = t.sent()) instanceof A._ && (e = d), this.emit("message_enriched", e, p), t.label = 7;
                case 7:
                  return l++, [3, 5];
                case 8:
                  return h = this.availableExtensions(null !== (r = e.event.integrations) && void 0 !== r ? r : {}), v = h.destinations, y = h.after, [4, new Promise((function(t, n) {
                    setTimeout((function() {
                      var r = v.map((function(t) {
                        return (0, M.a)(e, t)
                      }));
                      Promise.all(r).then(t).catch(n)
                    }), 0)
                  }))];
                case 9:
                  return t.sent(), e.stats.increment("message_delivered"), this.emit("message_delivered", e), m = y.map((function(t) {
                    return (0, M.a)(e, t)
                  })), [4, Promise.all(m)];
                case 10:
                  return t.sent(), [2, e]
              }
            }))
          }))
        }, n
      }(y.Q),
      F = function(e) {
        function n(t) {
          return e.call(this, "string" == typeof t ? new O.$(4, t) : t) || this
        }
        return (0, t.ZT)(n, e), n.prototype.flush = function() {
          return (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              return (0, p.s)() ? [2, []] : [2, e.prototype.flush.call(this)]
            }))
          }))
        }, n
      }(E);

    function D(t) {
      for (var e = t.constructor.prototype, n = 0, r = Object.getOwnPropertyNames(e); n < r.length; n++) {
        var i = r[n];
        if ("constructor" !== i) {
          var o = Object.getOwnPropertyDescriptor(t.constructor.prototype, i);
          o && "function" == typeof o.value && (t[i] = t[i].bind(t))
        }
      }
      return t
    }
    var C = {
        Cookie: "cookie",
        LocalStorage: "localStorage",
        Memory: "memory"
      },
      T = function(t, e, n, r) {
        console.warn("".concat(t.constructor.name, ": Can't ").concat(e, ' key "').concat(n, '" | Err: ').concat(r))
      },
      J = function() {
        function t(t) {
          this.stores = t
        }
        return t.prototype.get = function(t) {
          for (var e = null, n = 0, r = this.stores; n < r.length; n++) {
            var i = r[n];
            try {
              if (null != (e = i.get(t))) return e
            } catch (e) {
              T(i, "get", t, e)
            }
          }
          return null
        }, t.prototype.set = function(t, e) {
          this.stores.forEach((function(n) {
            try {
              n.set(t, e)
            } catch (e) {
              T(n, "set", t, e)
            }
          }))
        }, t.prototype.clear = function(t) {
          this.stores.forEach((function(e) {
            try {
              e.remove(t)
            } catch (n) {
              T(e, "remove", t, n)
            }
          }))
        }, t.prototype.getAndSync = function(t) {
          var e = this.get(t),
            n = "number" == typeof e ? e.toString() : e;
          return this.set(t, n), n
        }, t
      }(),
      N = function() {
        function t() {
          this.cache = {}
        }
        return t.prototype.get = function(t) {
          var e;
          return null !== (e = this.cache[t]) && void 0 !== e ? e : null
        }, t.prototype.set = function(t, e) {
          this.cache[t] = e
        }, t.prototype.remove = function(t) {
          delete this.cache[t]
        }, t
      }();

    function G(t) {
      return t && t.stores && Array.isArray(t.stores) && t.stores.every((function(t) {
        return Object.values(C).includes(t)
      }))
    }

    function q(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) t[r] = n[r]
      }
      return t
    }
    var L = function t(e, n) {
        function r(t, r, i) {
          if ("undefined" != typeof document) {
            "number" == typeof(i = q({}, n, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
            var o = "";
            for (var s in i) i[s] && (o += "; " + s, !0 !== i[s] && (o += "=" + i[s].split(";")[0]));
            return document.cookie = t + "=" + e.write(r, t) + o
          }
        }
        return Object.create({
          set: r,
          get: function(t) {
            if ("undefined" != typeof document && (!arguments.length || t)) {
              for (var n = document.cookie ? document.cookie.split("; ") : [], r = {}, i = 0; i < n.length; i++) {
                var o = n[i].split("="),
                  s = o.slice(1).join("=");
                try {
                  var u = decodeURIComponent(o[0]);
                  if (r[u] = e.read(s, u), t === u) break
                } catch (t) {}
              }
              return t ? r[t] : r
            }
          },
          remove: function(t, e) {
            r(t, "", q({}, e, {
              expires: -1
            }))
          },
          withAttributes: function(e) {
            return t(this.converter, q({}, this.attributes, e))
          },
          withConverter: function(e) {
            return t(q({}, this.converter, e), this.attributes)
          }
        }, {
          attributes: {
            value: Object.freeze(n)
          },
          converter: {
            value: Object.freeze(e)
          }
        })
      }({
        read: function(t) {
          return '"' === t[0] && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        },
        write: function(t) {
          return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
        }
      }, {
        path: "/"
      }),
      B = L;

    function U(t) {
      var e = function(t) {
        try {
          return new URL(t)
        } catch (t) {
          return
        }
      }(t);
      if (e)
        for (var n = function(t) {
            var e = t.hostname.split("."),
              n = e[e.length - 1],
              r = [];
            if (4 === e.length && parseInt(n, 10) > 0) return r;
            if (e.length <= 1) return r;
            for (var i = e.length - 2; i >= 0; --i) r.push(e.slice(i).join("."));
            return r
          }(e), r = 0; r < n.length; ++r) {
          var i = "__tld__",
            o = n[r],
            s = {
              domain: "." + o
            };
          try {
            if (B.set(i, "1", s), B.get(i)) return B.remove(i, s), o
          } catch (t) {
            return
          }
        }
    }
    var R = function() {
        function e(n) {
          void 0 === n && (n = e.defaults), this.options = (0, t.pi)((0, t.pi)({}, e.defaults), n)
        }
        return Object.defineProperty(e, "defaults", {
          get: function() {
            return {
              maxage: 365,
              domain: U(window.location.href),
              path: "/",
              sameSite: "Lax"
            }
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.opts = function() {
          return {
            sameSite: this.options.sameSite,
            expires: this.options.maxage,
            domain: this.options.domain,
            path: this.options.path,
            secure: this.options.secure
          }
        }, e.prototype.get = function(t) {
          var e;
          try {
            var n = B.get(t);
            if (null == n) return null;
            try {
              return null !== (e = JSON.parse(n)) && void 0 !== e ? e : null
            } catch (t) {
              return null != n ? n : null
            }
          } catch (t) {
            return null
          }
        }, e.prototype.set = function(t, e) {
          "string" == typeof e ? B.set(t, e, this.opts()) : null === e ? B.remove(t, this.opts()) : B.set(t, JSON.stringify(e), this.opts())
        }, e.prototype.remove = function(t) {
          return B.remove(t, this.opts())
        }, e
      }(),
      z = function() {
        function t() {}
        return t.prototype.localStorageWarning = function(t, e) {
          console.warn("Unable to access ".concat(t, ", localStorage may be ").concat(e))
        }, t.prototype.get = function(t) {
          var e;
          try {
            var n = localStorage.getItem(t);
            if (null === n) return null;
            try {
              return null !== (e = JSON.parse(n)) && void 0 !== e ? e : null
            } catch (t) {
              return null != n ? n : null
            }
          } catch (e) {
            return this.localStorageWarning(t, "unavailable"), null
          }
        }, t.prototype.set = function(t, e) {
          try {
            localStorage.setItem(t, JSON.stringify(e))
          } catch (e) {
            this.localStorageWarning(t, "full")
          }
        }, t.prototype.remove = function(t) {
          try {
            return localStorage.removeItem(t)
          } catch (e) {
            this.localStorageWarning(t, "unavailable")
          }
        }, t
      }();

    function K(t) {
      return t.map((function(t) {
        var e, n;
        switch (! function(t) {
            return "object" == typeof t && void 0 !== t.name
          }(t) ? e = t : (e = t.name, n = t.settings), e) {
          case C.Cookie:
            return new R(n);
          case C.LocalStorage:
            return new z;
          case C.Memory:
            return new N;
          default:
            throw new Error("Unknown Store Type: ".concat(t))
        }
      }))
    }

    function W(t, e) {
      return t.map((function(t) {
        return e && t === C.Cookie ? {
          name: t,
          settings: e
        } : t
      }))
    }
    var Z = {
        persist: !0,
        cookie: {
          key: "ajs_user_id",
          oldKey: "ajs_user"
        },
        localStorage: {
          key: "ajs_user_traits"
        }
      },
      V = function() {
        function e(e, n) {
          void 0 === e && (e = Z);
          var r, i, o, s, u = this;
          this.options = {}, this.id = function(t) {
            if (u.options.disable) return null;
            var e = u.identityStore.getAndSync(u.idKey);
            void 0 !== t && (u.identityStore.set(u.idKey, t), t !== e && null !== e && null !== t && u.anonymousId(null));
            var n = u.identityStore.getAndSync(u.idKey);
            if (n) return n;
            var r = u.legacyUserStore.get(Z.cookie.oldKey);
            return r ? "object" == typeof r ? r.id : r : null
          }, this.anonymousId = function(t) {
            var e, n;
            if (u.options.disable) return null;
            if (void 0 === t) {
              var r = null !== (e = u.identityStore.getAndSync(u.anonKey)) && void 0 !== e ? e : null === (n = u.legacySIO()) || void 0 === n ? void 0 : n[0];
              if (r) return r
            }
            return null === t ? (u.identityStore.set(u.anonKey, null), u.identityStore.getAndSync(u.anonKey)) : (u.identityStore.set(u.anonKey, null != t ? t : (0, m.v4)()), u.identityStore.getAndSync(u.anonKey))
          }, this.traits = function(t) {
            var e;
            if (!u.options.disable) return null === t && (t = {}), t && u.traitsStore.set(u.traitsKey, null != t ? t : {}), null !== (e = u.traitsStore.get(u.traitsKey)) && void 0 !== e ? e : {}
          }, this.options = (0, t.pi)((0, t.pi)({}, Z), e), this.cookieOptions = n, this.idKey = null !== (i = null === (r = e.cookie) || void 0 === r ? void 0 : r.key) && void 0 !== i ? i : Z.cookie.key, this.traitsKey = null !== (s = null === (o = e.localStorage) || void 0 === o ? void 0 : o.key) && void 0 !== s ? s : Z.localStorage.key, this.anonKey = "ajs_anonymous_id", this.identityStore = this.createStorage(this.options, n), this.legacyUserStore = this.createStorage(this.options, n, (function(t) {
            return t === C.Cookie
          })), this.traitsStore = this.createStorage(this.options, n, (function(t) {
            return t !== C.Cookie
          }));
          var a = this.legacyUserStore.get(Z.cookie.oldKey);
          a && "object" == typeof a && (a.id && this.id(a.id), a.traits && this.traits(a.traits)), D(this)
        }
        return e.prototype.legacySIO = function() {
          var t = this.legacyUserStore.get("_sio");
          if (!t) return null;
          var e = t.split("----");
          return [e[0], e[1]]
        }, e.prototype.identify = function(e, n) {
          if (!this.options.disable) {
            n = null != n ? n : {};
            var r = this.id();
            null !== r && r !== e || (n = (0, t.pi)((0, t.pi)({}, this.traits()), n)), e && this.id(e), this.traits(n)
          }
        }, e.prototype.logout = function() {
          this.anonymousId(null), this.id(null), this.traits({})
        }, e.prototype.reset = function() {
          this.logout(), this.identityStore.clear(this.idKey), this.identityStore.clear(this.anonKey), this.traitsStore.clear(this.traitsKey)
        }, e.prototype.load = function() {
          return new e(this.options, this.cookieOptions)
        }, e.prototype.save = function() {
          return !0
        }, e.prototype.createStorage = function(t, e, n) {
          var r = [C.LocalStorage, C.Cookie, C.Memory];
          return t.disable ? new J([]) : t.persist ? (void 0 !== t.storage && null !== t.storage && G(t.storage) && (r = t.storage.stores), t.localStorageFallbackDisabled && (r = r.filter((function(t) {
            return t !== C.LocalStorage
          }))), n && (r = r.filter(n)), new J(K(W(r, e)))) : new J([new N])
        }, e.defaults = Z, e
      }(),
      H = {
        persist: !0,
        cookie: {
          key: "ajs_group_id"
        },
        localStorage: {
          key: "ajs_group_properties"
        }
      },
      Y = function(e) {
        function n(n, r) {
          void 0 === n && (n = H);
          var i = e.call(this, (0, t.pi)((0, t.pi)({}, H), n), r) || this;
          return i.anonymousId = function(t) {}, D(i), i
        }
        return (0, t.ZT)(n, e), n
      }(V),
      Q = s(4278),
      $ = s(3744),
      X = s(6249),
      tt = function(t, e, n) {
        n.getCalls(t).forEach((function(t) {
          at(e, t).catch(console.error)
        }))
      },
      et = function(e, n) {
        return (0, t.mG)(void 0, void 0, void 0, (function() {
          var r, i, o;
          return (0, t.Jh)(this, (function(t) {
            switch (t.label) {
              case 0:
                r = 0, i = n.getCalls("addSourceMiddleware"), t.label = 1;
              case 1:
                return r < i.length ? (o = i[r], [4, at(e, o).catch(console.error)]) : [3, 4];
              case 2:
                t.sent(), t.label = 3;
              case 3:
                return r++, [3, 1];
              case 4:
                return [2]
            }
          }))
        }))
      },
      nt = tt.bind(void 0, "on"),
      rt = tt.bind(void 0, "setAnonymousId"),
      it = function(t) {
        if (ot(t)) {
          var e = t.pop();
          return S(e)
        }
      },
      ot = function(t) {
        return function(t) {
          if (!(0, o.PO)(t)) return !1;
          if ("bpc" !== t.__t) return !1;
          for (var e in t)
            if (!x.includes(e)) return !1;
          return !0
        }(t[t.length - 1])
      },
      st = function(t, e, n, r) {
        void 0 === n && (n = function() {}), void 0 === r && (r = console.error), this.method = t, this.resolve = n, this.reject = r, this.called = !1, this.args = e
      },
      ut = function() {
        function e() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          this._callMap = {}, this.push.apply(this, t)
        }
        return Object.defineProperty(e.prototype, "calls", {
          get: function() {
            return this._pushSnippetWindowBuffer(), this._callMap
          },
          set: function(t) {
            this._callMap = t
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.getCalls = function(t) {
          var e;
          return null !== (e = this.calls[t]) && void 0 !== e ? e : []
        }, e.prototype.push = function() {
          for (var e = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
          n.forEach((function(n) {
            ["track", "screen", "alias", "group", "page", "identify"].includes(n.method) && !ot(n.args) && (n.args = (0, t.ev)((0, t.ev)([], n.args, !0), [P()], !1)), e.calls[n.method] ? e.calls[n.method].push(n) : e.calls[n.method] = [n]
          }))
        }, e.prototype.clear = function() {
          this._pushSnippetWindowBuffer(), this.calls = {}
        }, e.prototype.toArray = function() {
          var t;
          return (t = []).concat.apply(t, Object.values(this.calls))
        }, e.prototype._pushSnippetWindowBuffer = function() {
          var t = (0, X.wI)();
          if (Array.isArray(t)) {
            var e = t.splice(0, t.length).map((function(t) {
              var e = t[0],
                n = t.slice(1);
              return new st(e, n)
            }));
            this.push.apply(this, e)
          }
        }, e
      }();

    function at(e, n) {
      return (0, t.mG)(this, void 0, Promise, (function() {
        var r, i;
        return (0, t.Jh)(this, (function(t) {
          switch (t.label) {
            case 0:
              return t.trys.push([0, 3, , 4]), n.called ? [2, void 0] : (n.called = !0, r = e[n.method].apply(e, n.args), "object" == typeof(o = r) && null !== o && "then" in o && "function" == typeof o.then ? [4, r] : [3, 2]);
            case 1:
              t.sent(), t.label = 2;
            case 2:
              return n.resolve(r), [3, 4];
            case 3:
              return i = t.sent(), n.reject(i), [3, 4];
            case 4:
              return [2]
          }
          var o
        }))
      }))
    }
    var ct = function() {
        function t(t) {
          var e = this;
          this.trackSubmit = this._createMethod("trackSubmit"), this.trackClick = this._createMethod("trackClick"), this.trackLink = this._createMethod("trackLink"), this.pageView = this._createMethod("pageview"), this.identify = this._createMethod("identify"), this.reset = this._createMethod("reset"), this.group = this._createMethod("group"), this.track = this._createMethod("track"), this.ready = this._createMethod("ready"), this.alias = this._createMethod("alias"), this.debug = this._createChainableMethod("debug"), this.page = this._createMethod("page"), this.once = this._createChainableMethod("once"), this.off = this._createChainableMethod("off"), this.on = this._createChainableMethod("on"), this.addSourceMiddleware = this._createMethod("addSourceMiddleware"), this.setAnonymousId = this._createMethod("setAnonymousId"), this.addDestinationMiddleware = this._createMethod("addDestinationMiddleware"), this.screen = this._createMethod("screen"), this.register = this._createMethod("register"), this.deregister = this._createMethod("deregister"), this.user = this._createMethod("user"), this.VERSION = Q.i, this._preInitBuffer = new ut, this._promise = t(this._preInitBuffer), this._promise.then((function(t) {
            var n = t[0],
              r = t[1];
            e.instance = n, e.ctx = r
          })).catch((function() {}))
        }
        return t.prototype.then = function() {
          for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (t = this._promise).then.apply(t, e)
        }, t.prototype.catch = function() {
          for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (t = this._promise).catch.apply(t, e)
        }, t.prototype.finally = function() {
          for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (t = this._promise).finally.apply(t, e)
        }, t.prototype._createMethod = function(t) {
          var e = this;
          return function() {
            for (var n, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
            if (e.instance) {
              var o = (n = e.instance)[t].apply(n, r);
              return Promise.resolve(o)
            }
            return new Promise((function(n, i) {
              e._preInitBuffer.push(new st(t, r, n, i))
            }))
          }
        }, t.prototype._createChainableMethod = function(t) {
          var e = this;
          return function() {
            for (var n, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
            return e.instance ? ((n = e.instance)[t].apply(n, r), e) : (e._preInitBuffer.push(new st(t, r)), e)
          }
        }, t
      }(),
      lt = "This is being deprecated and will be not be available in future releases of Analytics JS",
      ft = (0, $.R)(),
      pt = null == ft ? void 0 : ft.analytics;

    function dt() {
      console.warn(lt)
    }
    var ht, vt = function(e) {
        function n(n, r, i, o, s) {
          var u, a, c, l = this;
          (l = e.call(this) || this)._debug = !1, l.initialized = !1, l.user = function() {
            return l._user
          }, l.init = l.initialize.bind(l), l.log = dt, l.addIntegrationMiddleware = dt, l.listeners = dt, l.addEventListener = dt, l.removeAllListeners = dt, l.removeListener = dt, l.removeEventListener = dt, l.hasListeners = dt, l.add = dt, l.addIntegration = dt;
          var f = null == r ? void 0 : r.cookie,
            p = null !== (u = null == r ? void 0 : r.disableClientPersistence) && void 0 !== u && u;
          l.settings = n, l.settings.timeout = null !== (a = l.settings.timeout) && void 0 !== a ? a : 300, l.queue = null != i ? i : function(t, e, n) {
            void 0 === e && (e = !1), void 0 === n && (n = !1);
            var r = e ? 10 : 1,
              i = n ? new k.Z(r, []) : new O.$(r, t);
            return new F(i)
          }("".concat(n.writeKey, ":event-queue"), null == r ? void 0 : r.retryQueue, p);
          var d = null == r ? void 0 : r.storage;
          return l._universalStorage = l.createStore(p, d, f), l._user = null != o ? o : new V((0, t.pi)({
            persist: !p,
            storage: null == r ? void 0 : r.storage
          }, null == r ? void 0 : r.user), f).load(), l._group = null != s ? s : new Y((0, t.pi)({
            persist: !p,
            storage: null == r ? void 0 : r.storage
          }, null == r ? void 0 : r.group), f).load(), l.eventFactory = new I(l._user), l.integrations = null !== (c = null == r ? void 0 : r.integrations) && void 0 !== c ? c : {}, l.options = null != r ? r : {}, D(l), l
        }
        return (0, t.ZT)(n, e), n.prototype.createStore = function(t, e, n) {
          return t ? new J([new N]) : e && G(e) ? new J(K(W(e.stores, n))) : new J(K([C.LocalStorage, {
            name: C.Cookie,
            settings: n
          }, C.Memory]))
        }, Object.defineProperty(n.prototype, "storage", {
          get: function() {
            return this._universalStorage
          },
          enumerable: !1,
          configurable: !0
        }), n.prototype.track = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i, o, s, u, c, l = this;
            return (0, t.Jh)(this, (function(t) {
              return n = it(e), r = a.apply(void 0, e), i = r[0], o = r[1], s = r[2], u = r[3], c = this.eventFactory.track(i, o, s, this.integrations, n), [2, this._dispatch(c, u).then((function(t) {
                return l.emit("track", i, t.event.properties, t.event.options), t
              }))]
            }))
          }))
        }, n.prototype.page = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i, o, s, u, a, l, f = this;
            return (0, t.Jh)(this, (function(t) {
              return n = it(e), r = c.apply(void 0, e), i = r[0], o = r[1], s = r[2], u = r[3], a = r[4], l = this.eventFactory.page(i, o, s, u, this.integrations, n), [2, this._dispatch(l, a).then((function(t) {
                return f.emit("page", i, o, t.event.properties, t.event.options), t
              }))]
            }))
          }))
        }, n.prototype.identify = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i, o, s, u, a, c = this;
            return (0, t.Jh)(this, (function(t) {
              return n = it(e), r = l(this._user).apply(void 0, e), i = r[0], o = r[1], s = r[2], u = r[3], this._user.identify(i, o), a = this.eventFactory.identify(this._user.id(), this._user.traits(), s, this.integrations, n), [2, this._dispatch(a, u).then((function(t) {
                return c.emit("identify", t.event.userId, t.event.traits, t.event.options), t
              }))]
            }))
          }))
        }, n.prototype.group = function() {
          for (var t = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          var r = it(e);
          if (0 === e.length) return this._group;
          var i = l(this._group).apply(void 0, e),
            o = i[0],
            s = i[1],
            u = i[2],
            a = i[3];
          this._group.identify(o, s);
          var c = this._group.id(),
            f = this._group.traits(),
            p = this.eventFactory.group(c, f, u, this.integrations, r);
          return this._dispatch(p, a).then((function(e) {
            return t.emit("group", e.event.groupId, e.event.traits, e.event.options), e
          }))
        }, n.prototype.alias = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i, o, s, u, a, c = this;
            return (0, t.Jh)(this, (function(t) {
              return n = it(e), r = f.apply(void 0, e), i = r[0], o = r[1], s = r[2], u = r[3], a = this.eventFactory.alias(i, o, s, this.integrations, n), [2, this._dispatch(a, u).then((function(t) {
                return c.emit("alias", i, o, t.event.options), t
              }))]
            }))
          }))
        }, n.prototype.screen = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i, o, s, u, a, l, f = this;
            return (0, t.Jh)(this, (function(t) {
              return n = it(e), r = c.apply(void 0, e), i = r[0], o = r[1], s = r[2], u = r[3], a = r[4], l = this.eventFactory.screen(i, o, s, u, this.integrations, n), [2, this._dispatch(l, a).then((function(t) {
                return f.emit("screen", i, o, t.event.properties, t.event.options), t
              }))]
            }))
          }))
        }, n.prototype.trackClick = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r;
            return (0, t.Jh)(this, (function(i) {
              switch (i.label) {
                case 0:
                  return [4, s.e(119).then(s.bind(s, 1956))];
                case 1:
                  return n = i.sent(), [2, (r = n.link).call.apply(r, (0, t.ev)([this], e, !1))]
              }
            }))
          }))
        }, n.prototype.trackLink = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r;
            return (0, t.Jh)(this, (function(i) {
              switch (i.label) {
                case 0:
                  return [4, s.e(119).then(s.bind(s, 1956))];
                case 1:
                  return n = i.sent(), [2, (r = n.link).call.apply(r, (0, t.ev)([this], e, !1))]
              }
            }))
          }))
        }, n.prototype.trackSubmit = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r;
            return (0, t.Jh)(this, (function(i) {
              switch (i.label) {
                case 0:
                  return [4, s.e(119).then(s.bind(s, 1956))];
                case 1:
                  return n = i.sent(), [2, (r = n.form).call.apply(r, (0, t.ev)([this], e, !1))]
              }
            }))
          }))
        }, n.prototype.trackForm = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r;
            return (0, t.Jh)(this, (function(i) {
              switch (i.label) {
                case 0:
                  return [4, s.e(119).then(s.bind(s, 1956))];
                case 1:
                  return n = i.sent(), [2, (r = n.form).call.apply(r, (0, t.ev)([this], e, !1))]
              }
            }))
          }))
        }, n.prototype.register = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i = this;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return n = d._.system(), r = e.map((function(t) {
                    return i.queue.register(n, t, i)
                  })), [4, Promise.all(r)];
                case 1:
                  return t.sent(), [2, n]
              }
            }))
          }))
        }, n.prototype.deregister = function() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n, r, i = this;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return n = d._.system(), r = e.map((function(t) {
                    var e = i.queue.plugins.find((function(e) {
                      return e.name === t
                    }));
                    if (e) return i.queue.deregister(n, e, i);
                    n.log("warn", "plugin ".concat(t, " not found"))
                  })), [4, Promise.all(r)];
                case 1:
                  return t.sent(), [2, n]
              }
            }))
          }))
        }, n.prototype.debug = function(t) {
          return !1 === t && localStorage.getItem("debug") && localStorage.removeItem("debug"), this._debug = t, this
        }, n.prototype.reset = function() {
          this._user.reset(), this._group.reset(), this.emit("reset")
        }, n.prototype.timeout = function(t) {
          this.settings.timeout = t
        }, n.prototype._dispatch = function(e, n) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            var r;
            return (0, t.Jh)(this, (function(t) {
              return r = new d._(e), (0, p.s)() && !this.options.retryQueue ? [2, r] : [2, v(r, this.queue, this, {
                callback: n,
                debug: this._debug,
                timeout: this.settings.timeout
              })]
            }))
          }))
        }, n.prototype.addSourceMiddleware = function(e) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n = this;
            return (0, t.Jh)(this, (function(r) {
              switch (r.label) {
                case 0:
                  return [4, this.queue.criticalTasks.run((function() {
                    return (0, t.mG)(n, void 0, void 0, (function() {
                      var n, r, i;
                      return (0, t.Jh)(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return [4, Promise.resolve().then(s.bind(s, 6338))];
                          case 1:
                            return n = t.sent().sourceMiddlewarePlugin, r = {}, this.queue.plugins.forEach((function(t) {
                              if ("destination" === t.type) return r[t.name] = !0
                            })), i = n(e, r), [4, this.register(i)];
                          case 2:
                            return t.sent(), [2]
                        }
                      }))
                    }))
                  }))];
                case 1:
                  return r.sent(), [2, this]
              }
            }))
          }))
        }, n.prototype.addDestinationMiddleware = function(t) {
          for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          var r = this.queue.plugins.filter((function(e) {
            return e.name.toLowerCase() === t.toLowerCase()
          }));
          return r.forEach((function(t) {
            t.addMiddleware.apply(t, e)
          })), Promise.resolve(this)
        }, n.prototype.setAnonymousId = function(t) {
          return this._user.anonymousId(t)
        }, n.prototype.queryString = function(e) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return !1 === this.options.useQueryString ? [2, []] : [4, s.e(96).then(s.bind(s, 7473))];
                case 1:
                  return [2, (0, t.sent().queryString)(this, e)]
              }
            }))
          }))
        }, n.prototype.use = function(t) {
          return t(this), this
        }, n.prototype.ready = function(e) {
          return void 0 === e && (e = function(t) {
            return t
          }), (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              return [2, Promise.all(this.queue.plugins.map((function(t) {
                return t.ready ? t.ready() : Promise.resolve()
              }))).then((function(t) {
                return e(t), t
              }))]
            }))
          }))
        }, n.prototype.noConflict = function() {
          return console.warn(lt), (0, X.ql)(null != pt ? pt : this), this
        }, n.prototype.normalize = function(t) {
          return console.warn(lt), this.eventFactory.normalize(t)
        }, Object.defineProperty(n.prototype, "failedInitializations", {
          get: function() {
            return console.warn(lt), this.queue.failedInitializations
          },
          enumerable: !1,
          configurable: !0
        }), Object.defineProperty(n.prototype, "VERSION", {
          get: function() {
            return Q.i
          },
          enumerable: !1,
          configurable: !0
        }), n.prototype.initialize = function(e, n) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              return console.warn(lt), [2, Promise.resolve(this)]
            }))
          }))
        }, n.prototype.pageview = function(e) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return console.warn(lt), [4, this.page({
                    path: e
                  })];
                case 1:
                  return t.sent(), [2, this]
              }
            }))
          }))
        }, Object.defineProperty(n.prototype, "plugins", {
          get: function() {
            var t;
            return console.warn(lt), null !== (t = this._plugins) && void 0 !== t ? t : {}
          },
          enumerable: !1,
          configurable: !0
        }), Object.defineProperty(n.prototype, "Integrations", {
          get: function() {
            return console.warn(lt), this.queue.plugins.filter((function(t) {
              return "destination" === t.type
            })).reduce((function(t, e) {
              var n = "".concat(e.name.toLowerCase().replace(".", "").split(" ").join("-"), "Integration"),
                r = window[n];
              if (!r) return t;
              var i = r.Integration;
              return i ? (t[e.name] = i, t) : (t[e.name] = r, t)
            }), {})
          },
          enumerable: !1,
          configurable: !0
        }), n.prototype.push = function(t) {
          var e = t.shift();
          e && !this[e] || this[e].apply(this, t)
        }, n
      }(y.Q),
      yt = function(e) {
        function n() {
          var t = e.call(this, {
            writeKey: ""
          }, {
            disableClientPersistence: !0
          }) || this;
          return t.initialized = !0, t
        }
        return (0, t.ZT)(n, e), n
      }(vt),
      mt = s(5944),
      gt = s(7848),
      bt = s(6863);

    function wt(e) {
      return (0, t.mG)(this, void 0, Promise, (function() {
        var n;
        return (0, t.Jh)(this, (function(t) {
          return (n = navigator.userAgentData) ? e ? [2, n.getHighEntropyValues(e).catch((function() {
            return n.toJSON()
          }))] : [2, n.toJSON()] : [2, void 0]
        }))
      }))
    }

    function _t() {
      if (ht) return ht;
      var t = U(window.location.href);
      return ht = {
        expires: 31536e6,
        secure: !1,
        path: "/"
      }, t && (ht.domain = t), ht
    }
    var xt = function() {
        var e = this;
        this.name = "Page Enrichment", this.type = "before", this.version = "0.1.0", this.isLoaded = function() {
          return !0
        }, this.load = function(n, r) {
          return (0, t.mG)(e, void 0, void 0, (function() {
            var e;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  this.instance = r, t.label = 1;
                case 1:
                  return t.trys.push([1, 3, , 4]), e = this, [4, wt(this.instance.options.highEntropyValuesClientHints)];
                case 2:
                  return e.userAgentData = t.sent(), [3, 4];
                case 3:
                  return t.sent(), [3, 4];
                case 4:
                  return [2, Promise.resolve()]
              }
            }))
          }))
        }, this.enrich = function(r) {
          var i, o, s = r.event.context,
            u = s.page.search || "",
            a = "object" == typeof u ? function(t) {
              try {
                var e = new URLSearchParams;
                return Object.entries(t).forEach((function(t) {
                  var n = t[0],
                    r = t[1];
                  Array.isArray(r) ? r.forEach((function(t) {
                    return e.append(n, t)
                  })) : e.append(n, r)
                })), e.toString()
              } catch (t) {
                return ""
              }
            }(u) : u;
          s.userAgent = navigator.userAgent, s.userAgentData = e.userAgentData;
          var c = navigator.userLanguage || navigator.language;
          void 0 === s.locale && void 0 !== c && (s.locale = c), null !== (i = s.library) && void 0 !== i || (s.library = {
            name: "analytics.js",
            version: "".concat("web" === (0, n.B)() ? "next" : "npm:next", "-").concat(Q.i)
          }), a && !s.campaign && (s.campaign = function(t) {
            return t.startsWith("?") && (t = t.substring(1)), (t = t.replace(/\?/g, "&")).split("&").reduce((function(t, e) {
              var n = e.split("="),
                r = n[0],
                i = n[1],
                o = void 0 === i ? "" : i;
              if (r.includes("utm_") && r.length > 4) {
                var s = r.slice(4);
                "campaign" === s && (s = "name"), t[s] = (0, bt.a)(o)
              }
              return t
            }), {})
          }(a));
          var l = function() {
            var t = B.get("_ga");
            if (t && t.startsWith("amp")) return t
          }();
          l && (s.amp = {
              id: l
            }),
            function(e, n, r) {
              var i, o = new J(r ? [] : [new R(_t())]),
                s = o.get("s:context.referrer"),
                u = null !== (i = function(t) {
                  var e = {
                    btid: "dataxu",
                    urid: "millennial-media"
                  };
                  t.startsWith("?") && (t = t.substring(1));
                  for (var n = 0, r = (t = t.replace(/\?/g, "&")).split("&"); n < r.length; n++) {
                    var i = r[n].split("="),
                      o = i[0],
                      s = i[1];
                    if (e[o]) return {
                      id: s,
                      type: e[o]
                    }
                  }
                }(e)) && void 0 !== i ? i : s;
              u && (n && (n.referrer = (0, t.pi)((0, t.pi)({}, n.referrer), u)), o.set("s:context.referrer", u))
            }(a, s, null !== (o = e.instance.options.disableClientPersistence) && void 0 !== o && o);
          try {
            s.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
          } catch (t) {}
          return r
        }, this.track = this.enrich, this.identify = this.enrich, this.page = this.enrich, this.group = this.enrich, this.alias = this.enrich, this.screen = this.enrich
      },
      St = new xt,
      Pt = s(7070),
      jt = s(6338),
      It = s(98),
      Ot = function() {
        function e(t, e) {
          this.version = "1.0.0", this.alternativeNames = [], this.loadPromise = (0, gt.d)(), this.middleware = [], this.alias = this._createMethod("alias"), this.group = this._createMethod("group"), this.identify = this._createMethod("identify"), this.page = this._createMethod("page"), this.screen = this._createMethod("screen"), this.track = this._createMethod("track"), this.action = e, this.name = t, this.type = e.type, this.alternativeNames.push(e.name)
        }
        return e.prototype.addMiddleware = function() {
          for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          "destination" === this.type && (t = this.middleware).push.apply(t, e)
        }, e.prototype.transform = function(e) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            var n;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return [4, (0, jt.applyDestinationMiddleware)(this.name, e.event, this.middleware)];
                case 1:
                  return null === (n = t.sent()) && e.cancel(new A.Y({
                    retry: !1,
                    reason: "dropped by destination middleware"
                  })), [2, new d._(n)]
              }
            }))
          }))
        }, e.prototype._createMethod = function(e) {
          var n = this;
          return function(r) {
            return (0, t.mG)(n, void 0, Promise, (function() {
              var n, i;
              return (0, t.Jh)(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.action[e] ? (n = r, "destination" !== this.type ? [3, 2] : [4, this.transform(r)]) : [2, r];
                  case 1:
                    n = t.sent(), t.label = 2;
                  case 2:
                    return t.trys.push([2, 5, , 6]), [4, this.ready()];
                  case 3:
                    if (!t.sent()) throw new Error("Something prevented the destination from getting ready");
                    return (0, It.z)(r, {
                      integrationName: this.action.name,
                      methodName: e,
                      type: "action"
                    }), [4, this.action[e](n)];
                  case 4:
                    return t.sent(), [3, 6];
                  case 5:
                    throw i = t.sent(), (0, It.z)(r, {
                      integrationName: this.action.name,
                      methodName: e,
                      type: "action",
                      didError: !0
                    }), i;
                  case 6:
                    return [2, r]
                }
              }))
            }))
          }
        }, e.prototype.isLoaded = function() {
          return this.action.isLoaded()
        }, e.prototype.ready = function() {
          return (0, t.mG)(this, void 0, Promise, (function() {
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  return t.trys.push([0, 2, , 3]), [4, this.loadPromise.promise];
                case 1:
                  return t.sent(), [2, !0];
                case 2:
                  return t.sent(), [2, !1];
                case 3:
                  return [2]
              }
            }))
          }))
        }, e.prototype.load = function(e, n) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            var r, i, o, s;
            return (0, t.Jh)(this, (function(t) {
              switch (t.label) {
                case 0:
                  if (this.loadPromise.isSettled()) return [2, this.loadPromise.promise];
                  t.label = 1;
                case 1:
                  return t.trys.push([1, 3, , 4]), (0, It.z)(e, {
                    integrationName: this.action.name,
                    methodName: "load",
                    type: "action"
                  }), r = this.action.load(e, n), o = (i = this.loadPromise).resolve, [4, r];
                case 2:
                  return o.apply(i, [t.sent()]), [2, r];
                case 3:
                  throw s = t.sent(), (0, It.z)(e, {
                    integrationName: this.action.name,
                    methodName: "load",
                    type: "action",
                    didError: !0
                  }), this.loadPromise.reject(s), s;
                case 4:
                  return [2]
              }
            }))
          }))
        }, e.prototype.unload = function(t, e) {
          var n, r;
          return null === (r = (n = this.action).unload) || void 0 === r ? void 0 : r.call(n, t, e)
        }, e
      }();

    function kt(n, r) {
      return (0, t.mG)(this, void 0, Promise, (function() {
        var i, o, s, u, a;
        return (0, t.Jh)(this, (function(t) {
          switch (t.label) {
            case 0:
              if (i = new RegExp("https://cdn.segment.(com|build)"), o = (0, e.Vl)(), !r) return [3, 6];
              s = n.url.split("/"), u = s[s.length - 2], a = n.url.replace(u, btoa(u).replace(/=/g, "")), t.label = 1;
            case 1:
              return t.trys.push([1, 3, , 5]), [4, (0, Pt.v)(a.replace(i, o))];
            case 2:
              return t.sent(), [3, 5];
            case 3:
              return t.sent(), [4, (0, Pt.v)(n.url.replace(i, o))];
            case 4:
              return t.sent(), [3, 5];
            case 5:
              return [3, 8];
            case 6:
              return [4, (0, Pt.v)(n.url.replace(i, o))];
            case 7:
              t.sent(), t.label = 8;
            case 8:
              return "function" == typeof window[n.libraryName] ? [2, window[n.libraryName]] : [2]
          }
        }))
      }))
    }

    function At(e, n, r, i, o, s) {
      var u, a, c;
      return (0, t.mG)(this, void 0, Promise, (function() {
        var l, f, p, d = this;
        return (0, t.Jh)(this, (function(h) {
          switch (h.label) {
            case 0:
              return l = [], f = null !== (a = null === (u = e.middlewareSettings) || void 0 === u ? void 0 : u.routingRules) && void 0 !== a ? a : [], p = (null !== (c = e.remotePlugins) && void 0 !== c ? c : []).map((function(e) {
                return (0, t.mG)(d, void 0, void 0, (function() {
                  var u, a, c, p, d, h;
                  return (0, t.Jh)(this, (function(v) {
                    switch (v.label) {
                      case 0:
                        if (function(t, e) {
                            var n = t[e.creationName],
                              r = t[e.name];
                            return !1 === t.All && !n && !r || !1 === n || !1 === r
                          }(n, e)) return [2];
                        v.label = 1;
                      case 1:
                        return v.trys.push([1, 6, , 7]), (a = null == s ? void 0 : s.find((function(t) {
                          return t.pluginName === e.name
                        }))) ? [3, 3] : [4, kt(e, null == i ? void 0 : i.obfuscate)];
                      case 2:
                        a = v.sent(), v.label = 3;
                      case 3:
                        return (u = a) ? [4, u((0, t.pi)((0, t.pi)({}, e.settings), r[e.name]))] : [3, 5];
                      case 4:
                        c = v.sent(),
                          function(t) {
                            if (!Array.isArray(t)) throw new Error("Not a valid list of plugins");
                            var e = ["load", "isLoaded", "name", "version", "type"];
                            t.forEach((function(t) {
                              e.forEach((function(e) {
                                var n;
                                if (void 0 === t[e]) throw new Error("Plugin: ".concat(null !== (n = t.name) && void 0 !== n ? n : "unknown", " missing required function ").concat(e))
                              }))
                            }))
                          }(p = Array.isArray(c) ? c : [c]), d = f.filter((function(t) {
                            return t.destinationName === e.creationName
                          })), p.forEach((function(t) {
                            var n = new Ot(e.creationName, t);
                            d.length && o && "destination" === t.type && n.addMiddleware(o), l.push(n)
                          })), v.label = 5;
                      case 5:
                        return [3, 7];
                      case 6:
                        return h = v.sent(), console.warn("Failed to load Remote Plugin", h), [3, 7];
                      case 7:
                        return [2]
                    }
                  }))
                }))
              })), [4, Promise.all(p)];
            case 1:
              return h.sent(), [2, l.filter(Boolean)]
          }
        }))
      }))
    }
    var Mt = s(9950);

    function Et(t) {
      return (encodeURI(JSON.stringify(t)).split(/%..|./).length - 1) / 1024
    }

    function Ft(e, n) {
      var r, o, s, u, a, c = [],
        l = !1,
        f = null !== (r = null == n ? void 0 : n.size) && void 0 !== r ? r : 10,
        p = null !== (o = null == n ? void 0 : n.timeout) && void 0 !== o ? o : 5e3;

      function d(n) {
        var r;
        if (0 !== n.length) {
          var o = null === (r = n[0]) || void 0 === r ? void 0 : r.writeKey,
            s = n.map((function(e) {
              var n = e;
              n.sentAt;
              return (0, t._T)(n, ["sentAt"])
            }));
          return (0, i.h)("https://".concat(e, "/b"), {
            keepalive: l,
            headers: {
              "Content-Type": "text/plain"
            },
            method: "post",
            body: JSON.stringify({
              writeKey: o,
              batch: s,
              sentAt: (new Date).toISOString()
            })
          })
        }
      }

      function h() {
        return (0, t.mG)(this, void 0, Promise, (function() {
          var e;
          return (0, t.Jh)(this, (function(t) {
            return c.length ? (e = c, c = [], [2, d(e)]) : [2]
          }))
        }))
      }
      return u = function(t) {
        if ((l = t) && c.length) {
          var e = function(t) {
            var e = [],
              n = 0;
            return t.forEach((function(t) {
              Et(e[n]) >= 64 && n++, e[n] ? e[n].push(t) : e[n] = [t]
            })), e
          }(c).map(d);
          Promise.all(e).catch(console.error)
        }
      }, a = !1, window.addEventListener("pagehide", (function() {
        a || u(a = !0)
      })), document.addEventListener("visibilitychange", (function() {
        if ("hidden" == document.visibilityState) {
          if (a) return;
          a = !0
        } else a = !1;
        u(a)
      })), {
        dispatch: function(e, n) {
          return (0, t.mG)(this, void 0, Promise, (function() {
            var e;
            return (0, t.Jh)(this, (function(t) {
              return c.push(n), e = c.length >= f || function(t) {
                return Et(t) >= 450
              }(c), [2, e || l ? h() : void(s || (s = setTimeout((function() {
                s = void 0, h().catch(console.error)
              }), p)))]
            }))
          }))
        }
      }
    }

    function Dt(e, n, r, i) {
      var o, s = e.user();
      delete n.options, n.writeKey = null == r ? void 0 : r.apiKey, n.userId = n.userId || s.id(), n.anonymousId = n.anonymousId || s.anonymousId(), n.sentAt = new Date;
      var u = e.queue.failedInitializations || [];
      u.length > 0 && (n._metadata = {
        failedInitializations: u
      });
      var a = [],
        c = [];
      for (var l in i) {
        var f = i[l];
        "Segment.io" === l && a.push(l), "bundled" === f.bundlingStatus && a.push(l), "unbundled" === f.bundlingStatus && c.push(l)
      }
      for (var p = 0, d = (null == r ? void 0 : r.unbundledIntegrations) || []; p < d.length; p++) {
        var h = d[p];
        c.includes(h) || c.push(h)
      }
      var v = null !== (o = null == r ? void 0 : r.maybeBundledConfigIds) && void 0 !== o ? o : {},
        y = [];
      return a.sort().forEach((function(t) {
        var e;
        (null !== (e = v[t]) && void 0 !== e ? e : []).forEach((function(t) {
          y.push(t)
        }))
      })), !1 !== (null == r ? void 0 : r.addBundledMetadata) && (n._metadata = (0, t.pi)((0, t.pi)({}, n._metadata), {
        bundled: a.sort(),
        unbundled: c.sort(),
        bundledIds: y
      })), n
    }
    var Ct = s(8044);

    function Tt(e, n) {
      return (0, t.mG)(this, void 0, Promise, (function() {
        var r, i = this;
        return (0, t.Jh)(this, (function(o) {
          switch (o.label) {
            case 0:
              return r = [], (0, p.s)() ? [2, n] : [4, (0, Ct.x)((function() {
                return n.length > 0 && !(0, p.s)()
              }), (function() {
                return (0, t.mG)(i, void 0, void 0, (function() {
                  var i, o;
                  return (0, t.Jh)(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return (i = n.pop()) ? [4, (0, M.a)(i, e)] : [2];
                      case 1:
                        return o = t.sent(), o instanceof d._ || r.push(i), [2]
                    }
                  }))
                }))
              }))];
            case 1:
              return o.sent(), r.map((function(t) {
                return n.pushWithBackoff(t)
              })), [2, n]
          }
        }))
      }))
    }

    function Jt(e, n, r, i) {
      var o = this;
      e || setTimeout((function() {
        return (0, t.mG)(o, void 0, void 0, (function() {
          var e, o;
          return (0, t.Jh)(this, (function(t) {
            switch (t.label) {
              case 0:
                return e = !0, [4, Tt(r, n)];
              case 1:
                return o = t.sent(), e = !1, n.todo > 0 && i(e, o, r, i), [2]
            }
          }))
        }))
      }), 5e3 * Math.random())
    }
    var Nt = s(4328);

    function Gt(e, n, r) {
      var o, s, u;
      window.addEventListener("pagehide", (function() {
        l.push.apply(l, Array.from(f)), f.clear()
      }));
      var a, c = null !== (o = null == n ? void 0 : n.apiKey) && void 0 !== o ? o : "",
        l = e.options.disableClientPersistence ? new k.Z(e.queue.queue.maxAttempts, []) : new O.$(e.queue.queue.maxAttempts, "".concat(c, ":dest-Segment.io")),
        f = new Set,
        d = !1,
        h = null !== (s = null == n ? void 0 : n.apiHost) && void 0 !== s ? s : Nt.U,
        v = null !== (u = null == n ? void 0 : n.protocol) && void 0 !== u ? u : "https",
        y = "".concat(v, "://").concat(h),
        m = null == n ? void 0 : n.deliveryStrategy,
        g = "batching" === (null == m ? void 0 : m.strategy) ? Ft(h, m.config) : (a = null == m ? void 0 : m.config, {
          dispatch: function(t, e) {
            return (0, i.h)(t, {
              keepalive: null == a ? void 0 : a.keepalive,
              headers: {
                "Content-Type": "text/plain"
              },
              method: "post",
              body: JSON.stringify(e)
            })
          }
        });

      function b(i) {
        return (0, t.mG)(this, void 0, Promise, (function() {
          var o, s;
          return (0, t.Jh)(this, (function(t) {
            return (0, p.s)() ? (l.push(i), Jt(d, l, w, Jt), [2, i]) : (f.add(i), o = i.event.type.charAt(0), s = (0, Mt.D)(i.event).json(), "track" === i.event.type && delete s.traits, "alias" === i.event.type && (s = function(t, e) {
              var n, r, i, o, s = t.user();
              return e.previousId = null !== (i = null !== (r = null !== (n = e.previousId) && void 0 !== n ? n : e.from) && void 0 !== r ? r : s.id()) && void 0 !== i ? i : s.anonymousId(), e.userId = null !== (o = e.userId) && void 0 !== o ? o : e.to, delete e.from, delete e.to, e
            }(e, s)), [2, g.dispatch("".concat(y, "/").concat(o), Dt(e, s, n, r)).then((function() {
              return i
            })).catch((function() {
              return l.pushWithBackoff(i), Jt(d, l, w, Jt), i
            })).finally((function() {
              f.delete(i)
            }))])
          }))
        }))
      }
      var w = {
        name: "Segment.io",
        type: "destination",
        version: "0.1.0",
        isLoaded: function() {
          return !0
        },
        load: function() {
          return Promise.resolve()
        },
        track: b,
        identify: b,
        page: b,
        alias: b,
        group: b,
        screen: b
      };
      return l.todo && Jt(d, l, w, Jt), w
    }
    var qt = function(e) {
        function n(t, n) {
          var r = e.call(this, "".concat(t, " ").concat(n)) || this;
          return r.field = t, r
        }
        return (0, t.ZT)(n, e), n
      }(Error),
      Lt = "is not a string",
      Bt = "is not an object",
      Ut = "is nil";

    function Rt(t) {
      var e = ".userId/anonymousId/previousId/groupId",
        n = function(t) {
          var e, n, r;
          return null !== (r = null !== (n = null !== (e = t.userId) && void 0 !== e ? e : t.anonymousId) && void 0 !== n ? n : t.groupId) && void 0 !== r ? r : t.previousId
        }(t);
      if (!(0, o.Gg)(n)) throw new qt(e, Ut);
      if (!(0, o.HD)(n)) throw new qt(e, Lt)
    }

    function zt(t) {
      if (!(0, o.Gg)(t)) throw new qt("Event", Ut);
      if ("object" != typeof t) throw new qt("Event", Bt)
    }

    function Kt(t) {
      if (!(0, o.HD)(t.type)) throw new qt(".type", Lt)
    }

    function Wt(t) {
      if (!(0, o.HD)(t.event)) throw new qt(".event", Lt)
    }

    function Zt(t) {
      var e, n = t.event;
      zt(n), Kt(n), "track" === n.type && Wt(n);
      var r = null !== (e = n.properties) && void 0 !== e ? e : n.traits;
      if ("alias" !== n.type && !(0, o.PO)(r)) throw new qt(".properties", "is not an object");
      return Rt(n), t
    }
    var Vt, Ht, Yt = {
        name: "Event Validation",
        type: "before",
        version: "1.0.0",
        isLoaded: function() {
          return !0
        },
        load: function() {
          return Promise.resolve()
        },
        track: Zt,
        identify: Zt,
        page: Zt,
        alias: Zt,
        group: Zt,
        screen: Zt
      },
      Qt = null !== (Vt = (Ht = (0, $.R)()).__SEGMENT_INSPECTOR__) && void 0 !== Vt ? Vt : Ht.__SEGMENT_INSPECTOR__ = {},
      $t = s(6218);

    function Xt(e, n) {
      return (0, t.mG)(this, void 0, Promise, (function() {
        return (0, t.Jh)(this, (function(t) {
          switch (t.label) {
            case 0:
              return [4, et(e, n)];
            case 1:
              return t.sent(),
                function(t, e) {
                  e.toArray().forEach((function(e) {
                    setTimeout((function() {
                      at(t, e).catch(console.error)
                    }), 0)
                  }))
                }(e, n), n.clear(), [2]
          }
        }))
      }))
    }

    function te(e, n, i, o, u, a) {
      var c, l, f;
      return void 0 === u && (u = []), (0, t.mG)(this, void 0, Promise, (function() {
        var p, d, h, v, y, m, g, b, w, _, x, S, P, j, I = this;
        return (0, t.Jh)(this, (function(O) {
          switch (O.label) {
            case 0:
              return p = null == u ? void 0 : u.filter((function(t) {
                  return "object" == typeof t
                })), d = null == u ? void 0 : u.filter((function(t) {
                  return "function" == typeof t && "string" == typeof t.pluginName
                })),
                function(t) {
                  var e, n, i;
                  return "test" !== r().NODE_ENV && (null !== (i = null === (n = null === (e = t.middlewareSettings) || void 0 === e ? void 0 : e.routingRules) || void 0 === n ? void 0 : n.length) && void 0 !== i ? i : 0) > 0
                }(n) ? [4, Promise.all([s.e(870), s.e(604)]).then(s.bind(s, 669)).then((function(t) {
                  return t.tsubMiddleware(n.middlewareSettings.routingRules)
                }))] : [3, 2];
            case 1:
              return v = O.sent(), [3, 3];
            case 2:
              v = void 0, O.label = 3;
            case 3:
              return h = v, k = n, "test" !== r().NODE_ENV && Object.keys(k.integrations).length > 1 || a.length > 0 ? [4, s.e(464).then(s.bind(s, 3162)).then((function(t) {
                return t.ajsDestinations(e, n, i.integrations, o, h, a)
              }))] : [3, 5];
            case 4:
              return m = O.sent(), [3, 6];
            case 5:
              m = [], O.label = 6;
            case 6:
              return y = m, n.legacyVideoPluginsEnabled ? [4, s.e(150).then(s.bind(s, 9141)).then((function(t) {
                return t.loadLegacyVideoPlugins(i)
              }))] : [3, 8];
            case 7:
              O.sent(), O.label = 8;
            case 8:
              return (null === (c = o.plan) || void 0 === c ? void 0 : c.track) ? [4, s.e(493).then(s.bind(s, 5081)).then((function(t) {
                var e;
                return t.schemaFilter(null === (e = o.plan) || void 0 === e ? void 0 : e.track, n)
              }))] : [3, 10];
            case 9:
              return b = O.sent(), [3, 11];
            case 10:
              b = void 0, O.label = 11;
            case 11:
              return g = b, w = (0, mt.o)(n, o), [4, At(n, i.integrations, w, o, h, d).catch((function() {
                return []
              }))];
            case 12:
              return _ = O.sent(), x = (0, t.ev)((0, t.ev)((0, t.ev)([Yt, St], p, !0), y, !0), _, !0), g && x.push(g), !1 === (null === (l = o.integrations) || void 0 === l ? void 0 : l.All) && !o.integrations["Segment.io"] || o.integrations && !1 === o.integrations["Segment.io"] ? [3, 14] : (P = (S = x).push, [4, Gt(i, w["Segment.io"], n.integrations)]);
            case 13:
              P.apply(S, [O.sent()]), O.label = 14;
            case 14:
              return [4, i.register.apply(i, x)];
            case 15:
              return j = O.sent(), Object.entries(null !== (f = n.enabledMiddleware) && void 0 !== f ? f : {}).some((function(t) {
                return t[1]
              })) ? [4, s.e(214).then(s.bind(s, 9568)).then((function(e) {
                var r = e.remoteMiddlewares;
                return (0, t.mG)(I, void 0, void 0, (function() {
                  var e, s;
                  return (0, t.Jh)(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return [4, r(j, n, o.obfuscate)];
                      case 1:
                        return e = t.sent(), s = e.map((function(t) {
                          return i.addSourceMiddleware(t)
                        })), [2, Promise.all(s)]
                    }
                  }))
                }))
              }))] : [3, 17];
            case 16:
              O.sent(), O.label = 17;
            case 17:
              return [2, j]
          }
          var k
        }))
      }))
    }

    function ee(n, r, o) {
      var s, u, a, c, l, f, p, h, v, y;
      return void 0 === r && (r = {}), (0, t.mG)(this, void 0, Promise, (function() {
        var m, g, b, w, _, x, S, P, j, I, O;
        return (0, t.Jh)(this, (function(k) {
          switch (k.label) {
            case 0:
              return !0 === r.disable ? [2, [new yt, d._.system()]] : (r.globalAnalyticsKey && (0, X.jV)(r.globalAnalyticsKey), n.cdnURL && (0, e.UH)(n.cdnURL), r.initialPageview && o.push(new st("page", [])), null === (s = n.cdnSettings) || void 0 === s ? [3, 1] : (g = s, [3, 3]));
            case 1:
              return [4, (A = n.writeKey, M = n.cdnURL, E = null != M ? M : (0, e.Vl)(), (0, i.h)("".concat(E, "/v1/projects/").concat(A, "/settings")).then((function(t) {
                return t.ok ? t.json() : t.text().then((function(t) {
                  throw new Error(t)
                }))
              })).catch((function(t) {
                throw console.error(t.message), t
              })))];
            case 2:
              g = k.sent(), k.label = 3;
            case 3:
              return m = g, r.updateCDNSettings && (m = r.updateCDNSettings(m)), "function" != typeof r.disable ? [3, 5] : [4, r.disable(m)];
            case 4:
              if (k.sent()) return [2, [new yt, d._.system()]];
              k.label = 5;
            case 5:
              return b = null === (a = null === (u = m.integrations["Segment.io"]) || void 0 === u ? void 0 : u.retryQueue) || void 0 === a || a, r = (0, t.pi)({
                  retryQueue: b
                }, r),
                function(t) {
                  var e;
                  null === (e = Qt.attach) || void 0 === e || e.call(Qt, t)
                }(w = new vt(n, r)), _ = null !== (c = n.plugins) && void 0 !== c ? c : [], x = null !== (l = n.classicIntegrations) && void 0 !== l ? l : [], S = null === (f = r.integrations) || void 0 === f ? void 0 : f["Segment.io"], $t.j.initRemoteMetrics((0, t.pi)((0, t.pi)({}, m.metrics), {
                  host: null !== (p = null == S ? void 0 : S.apiHost) && void 0 !== p ? p : null === (h = m.metrics) || void 0 === h ? void 0 : h.host,
                  protocol: null == S ? void 0 : S.protocol
                })),
                function(t, e) {
                  rt(t, e), nt(t, e)
                }(w, o), [4, te(n.writeKey, m, w, r, _, x)];
            case 6:
              return P = k.sent(), j = null !== (v = window.location.search) && void 0 !== v ? v : "", I = null !== (y = window.location.hash) && void 0 !== y ? y : "", (O = j.length ? j : I.replace(/(?=#).*(?=\?)/, "")).includes("ajs_") ? [4, w.queryString(O).catch(console.error)] : [3, 8];
            case 7:
              k.sent(), k.label = 8;
            case 8:
              return w.initialized = !0, w.emit("initialize", n, r), [4, Xt(w, o)];
            case 9:
              return k.sent(), [2, [w, P]]
          }
          var A, M, E
        }))
      }))
    }
    var ne = function(e) {
        function n() {
          var t = this,
            n = (0, gt.d)(),
            r = n.promise,
            i = n.resolve;
          return t = e.call(this, (function(t) {
            return r.then((function(e) {
              return ee(e[0], e[1], t)
            }))
          })) || this, t._resolveLoadStart = function(t, e) {
            return i([t, e])
          }, t
        }
        return (0, t.ZT)(n, e), n.prototype.load = function(t, e) {
          return void 0 === e && (e = {}), this._resolveLoadStart(t, e), this
        }, n.load = function(t, e) {
          return void 0 === e && (e = {}), (new n).load(t, e)
        }, n.standalone = function(t, e) {
          return n.load({
            writeKey: t
          }, e).then((function(t) {
            return t[0]
          }))
        }, n
      }(ct),
      re = s(584);

    function ie() {
      var e, n;
      return (0, t.mG)(this, void 0, Promise, (function() {
        var r, i, o;
        return (0, t.Jh)(this, (function(t) {
          switch (t.label) {
            case 0:
              return r = function() {
                var t;
                if ((0, re.M)()) return (0, re.M)();
                var e = (0, X.wI)();
                if (null == e ? void 0 : e._writeKey) return e._writeKey;
                for (var n = /http.*\/analytics\.js\/v1\/([^/]*)(\/platform)?\/analytics.*/, r = void 0, i = 0, o = Array.prototype.slice.call(document.querySelectorAll("script")); i < o.length; i++) {
                  var s = null !== (t = o[i].getAttribute("src")) && void 0 !== t ? t : "";
                  if ((u = n.exec(s)) && u[1]) {
                    r = u[1];
                    break
                  }
                }
                if (!r && document.currentScript) {
                  var u;
                  s = document.currentScript.src, (u = n.exec(s)) && u[1] && (r = u[1])
                }
                return r
              }(), i = null !== (n = null === (e = (0, X.wI)()) || void 0 === e ? void 0 : e._loadOptions) && void 0 !== n ? n : {}, r ? (o = X.ql, [4, ne.standalone(r, i)]) : (console.error("Failed to load Write Key. Make sure to use the latest version of the Segment snippet, which can be found in your source settings."), [2]);
            case 1:
              return o.apply(void 0, [t.sent()]), [2]
          }
        }))
      }))
    }
    var oe, se = s(449);
    var ue = (0, e.Vl)();
    (0, e.UH)(ue), s.p = ue ? ue + "/analytics-next/bundles/" : "https://cdn.segment.com/analytics-next/bundles/", (0, n.X)("web");
    var ae = !1,
      ce = function(e) {
        (new se.B).increment("analytics_js.invoke.error", (0, t.ev)((0, t.ev)([], e, !0), ["wk:".concat((0, re.M)())], !1))
      };

    function le(e) {
      return (0, t.mG)(this, void 0, void 0, (function() {
        var n;
        return (0, t.Jh)(this, (function(r) {
          switch (r.label) {
            case 0:
              return r.trys.push([0, 2, , 3]), [4, e()];
            case 1:
              return [2, r.sent()];
            case 2:
              return n = r.sent(), i = n, console.error("[analytics.js]", "Failed to load Analytics.js", i), ce((0, t.ev)(["type:initialization"], i instanceof Error ? ["message:".concat(null == i ? void 0 : i.message), "name:".concat(null == i ? void 0 : i.name)] : [], !0)), [3, 3];
            case 3:
              return [2]
          }
          var i
        }))
      }))
    }
    document.addEventListener("securitypolicyviolation", (function(n) {
      !ae && function(t) {
        return "report" !== t.disposition && t.blockedURI.includes("cdn.segment")
      }(n) && (ae = !0, ce(["type:csp"]), function() {
        return (0, t.mG)(this, void 0, Promise, (function() {
          var n;
          return (0, t.Jh)(this, (function(t) {
            switch (t.label) {
              case 0:
                return console.warn("Your CSP policy is missing permissions required in order to run Analytics.js 2.0", "https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2/#using-a-strict-content-security-policy-on-the-page"), console.warn("Reverting to Analytics.js 1.0"), n = (0, e.YM)(), [4, (0, Pt.v)(n)];
              case 1:
                return t.sent(), [2]
            }
          }))
        }))
      }().catch(console.error))
    }));
    var fe = null === (oe = document.querySelector("script[data-global-segment-analytics-key]")) || void 0 === oe ? void 0 : oe.dataset.globalSegmentAnalyticsKey;
    if (fe && (0, X.jV)(fe), function() {
        var t = {
            Firefox: 46,
            Edge: 13
          },
          e = !!window.MSInputMethodContext && !!document.documentMode,
          n = navigator.userAgent.split(" "),
          r = n[n.length - 1].split("/"),
          i = r[0],
          o = r[1];
        return e || void 0 !== t[i] && t[i] >= parseInt(o)
      }()) {
      var pe = document.createElement("script");
      pe.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js"), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", (function() {
        return document.body.appendChild(pe)
      })) : document.body.appendChild(pe), pe.onload = function() {
        le(ie)
      }
    } else le(ie)
  }(), window.AnalyticsNext = u
}();
//# sourceMappingURL=standalone.js.map