!(function t(n, e, o) {
  function r(s, i) {
    if (!e[s]) {
      if (!n[s]) {
        var a = "function" == typeof require && require;
        if (!i && a) return a(s, !0);
        if (c) return c(s, !0);
        var u = new Error("Cannot find module '" + s + "'");
        throw ((u.code = "MODULE_NOT_FOUND"), u);
      }
      var f = (e[s] = { exports: {} });
      n[s][0].call(
        f.exports,
        function (t) {
          return r(n[s][1][t] || t);
        },
        f,
        f.exports,
        t,
        n,
        e,
        o
      );
    }
    return e[s].exports;
  }
  for (var c = "function" == typeof require && require, s = 0; s < o.length; s++) r(o[s]);
  return r;
})(
  {
    1: [
      function (t, n, e) {
        "use strict";
        function o(t) {
          const n = [],
            e = [];
          function o(t, n) {
            return new Promise((e, o) => {
              t.getDB(n.mountpoint, (t, n) => {
                if (t) return o(t);
                e(n);
              });
            });
          }
          async function c(t, n, e) {
            const r = await o(t, n);
            return new Promise((n, o) => {
              (async function () {
                const c = r.transaction([t.DB_STORE_NAME], "readwrite"),
                  s = c.objectStore(t.DB_STORE_NAME);
                for (const n of e)
                  await new Promise((e, o) => {
                    t.storeRemoteEntry(s, n.path, n, (t) => {
                      if (t) return o(t);
                      e();
                    });
                  });
                ((c.onerror = (t) => {
                  (o(t), t.preventDefault());
                }),
                  (c.oncomplete = (t) => {
                    n();
                  }));
              })().catch(o);
            });
          }
          async function a(t, n) {
            const e = (await o(t, n)).transaction([t.DB_STORE_NAME], "readwrite").objectStore(t.DB_STORE_NAME);
            await new Promise((t, n) => {
              const o = e.clear();
              ((o.onsuccess = () => t()), (o.onerror = () => n(o.error)));
            });
          }
          return (
            (window.syncfs = (o, f, w, l, p) => {
              (async function () {
                if (w)
                  for (const t of n) {
                    const n = await t(o, f);
                    if (n) {
                      if ((await a(o, f), n.length > 0)) {
                        const t = s(n);
                        await c(o, f, t);
                      }
                      break;
                    }
                  }
                p((n) => {
                  (l(n),
                    (async function () {
                      if (!w) {
                        let t = null;
                        const n = async () => (
                          null === t &&
                            (t = (function (t) {
                              let n = 0;
                              const e = t.map((t) => {
                                  const e = r.encode(t.path);
                                  return (
                                    (n += 4 + e.length + 8 + 4 + 1 + (t.contents ? 4 + t.contents.length : 0)),
                                    { key: e, time: t.timestamp.getTime(), mode: t.mode, contents: t.contents }
                                  );
                                }),
                                o = new Uint8Array(n);
                              let c = 0;
                              for (const t of e) {
                                const n = t.key,
                                  e = t.time,
                                  r = t.mode,
                                  s = t.contents;
                                ((c = i(o, n.length, c)),
                                  o.set(n, c),
                                  (c += n.length),
                                  (c = u(o, e, c)),
                                  (c = i(o, r, c)),
                                  (o[c] = s ? 1 : 0),
                                  (c += 1),
                                  s && ((c = i(o, s.length, c)), o.set(s, c), (c += s.length)));
                              }
                              return o;
                            })(
                              await (async function (t, n) {
                                const e = await new Promise((e, o) => {
                                    t.getLocalSet(n, (t, n) => {
                                      if (t) return o(t);
                                      e(n);
                                    });
                                  }),
                                  o = [];
                                for (const n of Object.keys(e.entries)) {
                                  const e = await new Promise((e, o) => {
                                    t.loadLocalEntry(n, (t, n) => {
                                      if (t) return o(t);
                                      e(n);
                                    });
                                  });
                                  ((e.path = n), o.push(e));
                                }
                                return o;
                              })(o, f)
                            )),
                          t
                        );
                        for (const t of e) t(n, o, f);
                      }
                    })().catch((n) => {
                      t("ERR!!! syncfs error", n);
                    }));
                });
              })().catch((n) => {
                (t("ERR!!! syncfs error", n), l(n));
              });
            }),
            {
              addListener: (t) => {
                (n.push(t.onLoad), e.push(t.onSave));
              }
            }
          );
        }
        (Object.defineProperty(e, "__esModule", { value: !0 }), (e.wrapIDBFS = void 0), (e.wrapIDBFS = o));
        const r = new TextEncoder(),
          c = new TextDecoder();
        function s(t) {
          const n = [];
          let e = 0;
          for (; e < t.length; ) {
            const o = a(t, e);
            e += 4;
            const r = c.decode(t.subarray(e, e + o));
            e += o;
            const s = f(t, e);
            e += 8;
            const i = a(t, e);
            e += 4;
            const u = 1 === t[e];
            let w;
            if (((e += 1), u)) {
              const n = a(t, e);
              ((e += 4), (w = t.subarray(e, e + n)), (e += n));
            }
            n.push({ path: r, timestamp: new Date(s), mode: i, contents: w });
          }
          return n;
        }
        function i(t, n, e) {
          return (
            (t[e] = 255 & n),
            (t[e + 1] = (65280 & n) >> 8),
            (t[e + 2] = (16711680 & n) >> 16),
            (t[e + 3] = (4278190080 & n) >> 24),
            e + 4
          );
        }
        function a(t, n) {
          return (
            (255 & t[n]) | ((t[n + 1] << 8) & 65280) | ((t[n + 2] << 16) & 16711680) | ((t[n + 3] << 24) & 4278190080)
          );
        }
        function u(t, n, e) {
          const o = (n / 4294967296) >>> 0;
          return (i(t, n >>> 0, e), i(t, o, e + 4), e + 8);
        }
        function f(t, n) {
          const e = a(t, n);
          return 4294967296 * a(t, n + 4) + e;
        }
        window.wrapIDBFS = o;
      },
      {}
    ]
  },
  {},
  [1]
);
