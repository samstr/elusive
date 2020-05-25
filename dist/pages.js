'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
var ElusiveClient = require('./ElusiveClient-7405d865.js');
var index = require('./index.js');
require('./errors-b316e546.js');
require('./utils-8eb11d51.js');
var asyncToGenerator = require('./asyncToGenerator-42483001.js');
require('bcryptjs');
require('./utils-c048fd8a.js');
var utils$1$1 = require('./utils-3409f232.js');
var utils$2 = require('./utils-24b30e03.js');
var _JSXStyle = _interopDefault(require('styled-jsx/style'));
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var SignupForm = require('./SignupForm-50923600.js');
require('react-bootstrap');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var router = require('next/router');
require('./signup-5c75c218.js');
var utils$3 = require('./utils-081fbcf9.js');
var Link = _interopDefault(require('next/link'));

var __jsx = React__default.createElement;
var defaultValue = {
  isAuthenticated: false,
  claims: null,
  _ready: false
};
var SessionContext = React.createContext(defaultValue);
var SessionContextProvider = function SessionContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      sessionContext = _useState[0],
      setSessionContext = _useState[1];

  var resetSessionContext = function resetSessionContext() {
    return setSessionContext(defaultValue);
  };

  var context = {
    sessionContext: sessionContext,
    setSessionContext: setSessionContext,
    resetSessionContext: resetSessionContext
  };
  return __jsx(SessionContext.Provider, {
    value: context
  }, children);
};
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useSessionContext = function useSessionContext() {
  return React.useContext(SessionContext);
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { ElusiveClient._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useSession = function useSession() {
  var _useSessionContext = useSessionContext(),
      sessionContext = _useSessionContext.sessionContext,
      resetSessionContext = _useSessionContext.resetSessionContext,
      setSessionContext = _useSessionContext.setSessionContext;

  var _useState = React.useState(sessionContext),
      session = _useState[0],
      setSession = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils$3.HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1$1.loginRoute()) {
        router$1.replace(utils$1$1.loginRoute());
      }

      return;
    }

    console.log('Unknown error in useSession: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee() {
        var response, _session, pathname, user;

        return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__default(utils$1$1.sessionAPIRoute(), {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

              case 3:
                response = _context.sent;
                cancelRequest = null;
                _session = _objectSpread(_objectSpread({}, response.data.session), {}, {
                  _ready: true
                });
                setSession(_session);
                setSessionContext(_session); // if user still needs onboarding

                if (_session.isAuthenticated) {
                  pathname = window.location.pathname;
                  user = _session.claims.user;

                  if (user.needsOnboarding && pathname !== utils$1$1.onboardingRoute()) {
                    router$1.replace(utils$1$1.onboardingRoute());
                  }
                }

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", handleError(_context.t0));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return session;
};

var __jsx$1 = React__default.createElement;

var LoginPage = function LoginPage() {
  var router$1 = router.useRouter();
  var session = useSession();

  var _useState = React.useState(),
      type = _useState[0],
      setType = _useState[1];

  var _useState2 = React.useState(),
      success = _useState2[0],
      setSuccess = _useState2[1];

  var _Elusive$options = index.options,
      mailOptions = _Elusive$options.mail,
      siteOptions = _Elusive$options.site;
  React.useEffect(function () {
    if (router$1.query.type) {
      if (utils$2.LOGIN_TYPES.includes(router$1.query.type)) {
        setType(router$1.query.type);
      } else {
        router$1.replace(utils$1$1.loginRoute());
      }
    } else {
      setType();
      setSuccess();
    }
  }, [router$1.query]);
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router$1.replace(utils$1$1.homeRoute());
    }
  }, [session]);

  var loginTypeRouteWithNext = function loginTypeRouteWithNext(type) {
    var url = "".concat(utils$1$1.loginRoute(), "?type=").concat(type);

    if (router$1.query.next) {
      url = "".concat(url, "&next=").concat(encodeURIComponent(router$1.query.next));
    }

    return url;
  };

  var onPasswordSuccess = function onPasswordSuccess() {
    var next = utils$1$1.homeRoute();

    if (router$1.query.next) {
      next = decodeURIComponent(router$1.query.next);
    }

    window.location = next;
  };

  var onLinkSuccess = function onLinkSuccess() {
    return setSuccess(true);
  };

  return __jsx$1(SignupForm.AuthBasePage, null, type === utils$2.LOGIN_TYPE_PASSWORD && __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "form"
  }, __jsx$1(SignupForm.LoginWithPasswordForm, {
    onSuccess: onPasswordSuccess
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx$1(Link, {
    href: utils$1$1.resetRoute()
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Forgot your password?")), "\xA0\xA0\u2022\xA0\xA0", __jsx$1(Link, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Email me a login link")))), type === utils$2.LOGIN_TYPE_LINK && __jsx$1(React__default.Fragment, null, success ? __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Check your inbox"), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "intro"
  }, __jsx$1("p", {
    className: "jsx-1275567024"
  }, "We have sent you an email with an automatic login link."), __jsx$1("p", {
    className: "jsx-1275567024"
  }, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "form"
  }, __jsx$1(SignupForm.LoginWithLinkForm, {
    onSuccess: onLinkSuccess
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx$1(Link, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Use password"))))), !type && __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "How do you want to login?"), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "options"
  }, __jsx$1(Link, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx$1("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx$1("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx$1("img", {
    src: "/img/icons/password-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Login with my password"))), __jsx$1(Link, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx$1("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx$1("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx$1("img", {
    src: "/img/icons/email-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Email me a login link")))), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx$1(Link, {
    href: utils$1$1.signupRoute()
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Create an account instead")))), __jsx$1(_JSXStyle, {
    id: "1275567024"
  }, ".options.jsx-1275567024{text-align:center;}a.option.jsx-1275567024{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;vertical-align:top;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;justify-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:150px;height:150px;border:2px solid #78a7e6;border-radius:3px;margin:0 12px;padding:20px;font-weight:bold;cursor:pointer;-webkit-transition:0.15s ease-in-out -webkit-transform, 0.15s ease-in-out border-color;-webkit-transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;background-color:#fff;font-size:16px;}a.option.jsx-1275567024:hover{border-color:#f90;-webkit-text-decoration:none;text-decoration:none;-webkit-transform:scale(1.025);-ms-transform:scale(1.025);transform:scale(1.025);-webkit-text-decoration:none !important;text-decoration:none !important;}.icon.jsx-1275567024{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.text.jsx-1275567024{margin-top:10px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luUGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5SWtCLEFBRzZCLEFBSUUsQUFxQkYsQUFPWCxBQUtTLGdCQUNsQixFQXJDQSxBQXlCdUIsZUFPUixtQ0FOVSxrQ0F0QkQsS0E2QnhCLDBDQU5rQywrQkF0QmIsbUJBQ0Esc0JBc0JyQix1RUFyQnVCLHFCQUNFLG1HQUNYLFlBQ0MsYUFDWSx5QkFDUCxrQkFDSixjQUNELGFBQ0ksaUJBQ0YsZUFFaUIsNk9BQ1Ysc0JBQ1AsZUFDakIiLCJmaWxlIjoiTG9naW5QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRWx1c2l2ZSBmcm9tICcuLi8nO1xuaW1wb3J0IHsgTE9HSU5fVFlQRV9MSU5LLCBMT0dJTl9UWVBFX1BBU1NXT1JELCBMT0dJTl9UWVBFUyB9IGZyb20gJy4uL2F1dGgnO1xuaW1wb3J0IHtcbiAgQXV0aEJhc2VQYWdlLFxuICBMb2dpbldpdGhMaW5rRm9ybSxcbiAgTG9naW5XaXRoUGFzc3dvcmRGb3JtLFxufSBmcm9tICcuLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGhvbWVSb3V0ZSwgbG9naW5Sb3V0ZSwgcmVzZXRSb3V0ZSwgc2lnbnVwUm91dGUgfSBmcm9tICcuLi9yb3V0ZXMnO1xuXG5pbXBvcnQgdXNlU2Vzc2lvbiBmcm9tICcuL3VzZVNlc3Npb24nO1xuXG5jb25zdCBMb2dpblBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBzZXNzaW9uID0gdXNlU2Vzc2lvbigpO1xuICBjb25zdCBbdHlwZSwgc2V0VHlwZV0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCB7IG1haWw6IG1haWxPcHRpb25zLCBzaXRlOiBzaXRlT3B0aW9ucyB9ID0gRWx1c2l2ZS5vcHRpb25zO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5xdWVyeS50eXBlKSB7XG4gICAgICBpZiAoTE9HSU5fVFlQRVMuaW5jbHVkZXMocm91dGVyLnF1ZXJ5LnR5cGUpKSB7XG4gICAgICAgIHNldFR5cGUocm91dGVyLnF1ZXJ5LnR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm91dGVyLnJlcGxhY2UobG9naW5Sb3V0ZSgpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VHlwZSgpO1xuICAgICAgc2V0U3VjY2VzcygpO1xuICAgIH1cbiAgfSwgW3JvdXRlci5xdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlc3Npb24uX3JlYWR5ICYmIHNlc3Npb24uaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICByb3V0ZXIucmVwbGFjZShob21lUm91dGUoKSk7XG4gICAgfVxuICB9LCBbc2Vzc2lvbl0pO1xuXG4gIGNvbnN0IGxvZ2luVHlwZVJvdXRlV2l0aE5leHQgPSAodHlwZSkgPT4ge1xuICAgIGxldCB1cmwgPSBgJHtsb2dpblJvdXRlKCl9P3R5cGU9JHt0eXBlfWA7XG5cbiAgICBpZiAocm91dGVyLnF1ZXJ5Lm5leHQpIHtcbiAgICAgIHVybCA9IGAke3VybH0mbmV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChyb3V0ZXIucXVlcnkubmV4dCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIGNvbnN0IG9uUGFzc3dvcmRTdWNjZXNzID0gKCkgPT4ge1xuICAgIGxldCBuZXh0ID0gaG9tZVJvdXRlKCk7XG4gICAgaWYgKHJvdXRlci5xdWVyeS5uZXh0KSB7XG4gICAgICBuZXh0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHJvdXRlci5xdWVyeS5uZXh0KTtcbiAgICB9XG4gICAgd2luZG93LmxvY2F0aW9uID0gbmV4dDtcbiAgfTtcblxuICBjb25zdCBvbkxpbmtTdWNjZXNzID0gKCkgPT4gc2V0U3VjY2Vzcyh0cnVlKTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQmFzZVBhZ2U+XG4gICAgICB7dHlwZSA9PT0gTE9HSU5fVFlQRV9QQVNTV09SRCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGgxPkxvZ2luIHRvIHtzaXRlT3B0aW9ucy5uYW1lfTwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICA8TG9naW5XaXRoUGFzc3dvcmRGb3JtIG9uU3VjY2Vzcz17b25QYXNzd29yZFN1Y2Nlc3N9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e3Jlc2V0Um91dGUoKX0+XG4gICAgICAgICAgICAgIDxhPkZvcmdvdCB5b3VyIHBhc3N3b3JkPzwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICZuYnNwOyZuYnNwOyZidWxsOyZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgPExpbmsgaHJlZj17bG9naW5UeXBlUm91dGVXaXRoTmV4dChMT0dJTl9UWVBFX0xJTkspfT5cbiAgICAgICAgICAgICAgPGE+RW1haWwgbWUgYSBsb2dpbiBsaW5rPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7dHlwZSA9PT0gTE9HSU5fVFlQRV9MSU5LICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgICB7c3VjY2VzcyA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxoMT5DaGVjayB5b3VyIGluYm94PC9oMT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRyb1wiPlxuICAgICAgICAgICAgICAgIDxwPldlIGhhdmUgc2VudCB5b3UgYW4gZW1haWwgd2l0aCBhbiBhdXRvbWF0aWMgbG9naW4gbGluay48L3A+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICBZb3UgbWF5IG5lZWQgdG8gY2hlY2sgeW91ciBzcGFtIGZvbGRlciBvciB3aGl0ZWxpc3R7JyAnfVxuICAgICAgICAgICAgICAgICAge21haWxPcHRpb25zLmZyb21FbWFpbH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxoMT5Mb2dpbiB0byB7c2l0ZU9wdGlvbnMubmFtZX08L2gxPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICA8TG9naW5XaXRoTGlua0Zvcm0gb25TdWNjZXNzPXtvbkxpbmtTdWNjZXNzfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPXtsb2dpblR5cGVSb3V0ZVdpdGhOZXh0KExPR0lOX1RZUEVfUEFTU1dPUkQpfT5cbiAgICAgICAgICAgICAgICAgIDxhPlVzZSBwYXNzd29yZDwvYT5cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAgeyF0eXBlICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8aDE+SG93IGRvIHlvdSB3YW50IHRvIGxvZ2luPzwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICA8TGluayBocmVmPXtsb2dpblR5cGVSb3V0ZVdpdGhOZXh0KExPR0lOX1RZUEVfUEFTU1dPUkQpfT5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9pbWcvaWNvbnMvcGFzc3dvcmQtMWE3M2U4LnN2Z1wiIHdpZHRoPVwiMzhcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dFwiPkxvZ2luIHdpdGggbXkgcGFzc3dvcmQ8L2Rpdj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmsgaHJlZj17bG9naW5UeXBlUm91dGVXaXRoTmV4dChMT0dJTl9UWVBFX0xJTkspfT5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9pbWcvaWNvbnMvZW1haWwtMWE3M2U4LnN2Z1wiIHdpZHRoPVwiMzhcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dFwiPkVtYWlsIG1lIGEgbG9naW4gbGluazwvZGl2PlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e3NpZ251cFJvdXRlKCl9PlxuICAgICAgICAgICAgICA8YT5DcmVhdGUgYW4gYWNjb3VudCBpbnN0ZWFkPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICl9XG5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLm9wdGlvbnMge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGEub3B0aW9uIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IDE1MHB4O1xuICAgICAgICAgIGhlaWdodDogMTUwcHg7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzc4YTdlNjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgbWFyZ2luOiAwIDEycHg7XG4gICAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgdHJhbnNpdGlvbjogMC4xNXMgZWFzZS1pbi1vdXQgdHJhbnNmb3JtLFxuICAgICAgICAgICAgMC4xNXMgZWFzZS1pbi1vdXQgYm9yZGVyLWNvbG9yO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICB9XG5cbiAgICAgICAgYS5vcHRpb246aG92ZXIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogI2Y5MDtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyNSk7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAuaWNvbiB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRleHQge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L0F1dGhCYXNlUGFnZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luUGFnZTtcbiJdfQ== */\n/*@ sourceURL=LoginPage.js */"));
};

var __jsx$2 = React__default.createElement;

var LogoutPage = function LogoutPage() {
  var router$1 = router.useRouter();
  var session = useSession();
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router$1.replace(utils$1$1.loginRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    window.location = utils$1$1.indexRoute();
  };

  return __jsx$2(SignupForm.AuthBasePage, null, __jsx$2("h1", null, "Logout"), __jsx$2("div", {
    className: "intro"
  }, "Are sure you want to logout?"), __jsx$2("div", {
    className: "form"
  }, __jsx$2(SignupForm.LogoutForm, {
    onSuccess: onSuccess
  })));
};

var __jsx$3 = React__default.createElement;

var ResetPage = function ResetPage() {
  useSession();
  var mailOptions = index.options.mail;

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$3(SignupForm.AuthBasePage, null, success ? __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Check your inbox"), __jsx$3("div", {
    className: "intro"
  }, __jsx$3("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$3("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Forgot your password?"), __jsx$3("div", {
    className: "form"
  }, __jsx$3(SignupForm.ResetForm, {
    onSuccess: onSuccess
  }))));
};

var __jsx$4 = React__default.createElement;

var SignupPage = function SignupPage() {
  var router$1 = router.useRouter();
  var session = useSession();
  var mailOptions = index.options.mail;
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router$1.replace(utils$1$1.homeRoute());
    }
  }, [session]);

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$4(SignupForm.AuthBasePage, null, success ? __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Check your inbox"), __jsx$4("div", {
    className: "intro"
  }, __jsx$4("p", null, "Please confirm your email address to get started."), __jsx$4("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Create an account"), __jsx$4("div", {
    className: "form"
  }, __jsx$4(SignupForm.SignupForm, {
    onSuccess: onSuccess
  })), __jsx$4("div", {
    className: "footer"
  }, __jsx$4(Link, {
    href: utils$1$1.loginRoute()
  }, __jsx$4("a", null, "I already have an account")))));
};

var useData = function useData() {
  var _useSessionContext = useSessionContext(),
      resetSessionContext = _useSessionContext.resetSessionContext;

  var _useState = React.useState(),
      data = _useState[0],
      setData = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils$3.HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1$1.loginRoute()) {
        router$1.replace(utils$1$1.loginRoute());
      }

      return;
    }

    if (err.response && err.response.data) {
      setData(err.response.data);
      return;
    }

    console.log('Unknown error in useData: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee() {
        var _window$location, pathname, search, url, response;

        return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search;
                url = "/api/data".concat(pathname).concat(search);
                _context.next = 5;
                return axios__default(url, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

              case 5:
                response = _context.sent;
                cancelRequest = null;
                setData(response.data);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", handleError(_context.t0));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return data;
};

var __jsx$5 = React__default.createElement;
var defaultValue$1 = null;
var UserContext = React.createContext(defaultValue$1);
var UserContextProvider = function UserContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue$1),
      userContext = _useState[0],
      setUserContext = _useState[1];

  var resetUserContext = function resetUserContext() {
    return setUserContext(defaultValue$1);
  };

  var context = {
    userContext: userContext,
    setUserContext: setUserContext,
    resetUserContext: resetUserContext
  };
  return __jsx$5(UserContext.Provider, {
    value: context
  }, children);
};
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useUserContext = function useUserContext() {
  return React.useContext(UserContext);
};

var useRedirect = function useRedirect(href, asPath) {
  var router$1 = router.useRouter();
  React.useEffect(function () {
    router$1.replace(href, asPath);
  }, []);
};

var useRequireAuth = function useRequireAuth() {
  var router$1 = router.useRouter();

  var _useSessionContext = useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(utils$1$1.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { ElusiveClient._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useUser = function useUser() {
  var _useUserContext = useUserContext(),
      resetUserContext = _useUserContext.resetUserContext,
      setUserContext = _useUserContext.setUserContext;

  var _useState = React.useState(),
      user = _useState[0],
      setUser = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils$3.HTTP_STATUS_UNAUTHORIZED) {
      resetUserContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1$1.loginRoute()) {
        router$1.replace(utils$1$1.loginRoute());
      }

      return;
    }

    console.log('Unknown error in useUser: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee() {
        var response, _user;

        return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__default(utils$1$1.userAPIRoute(), {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

              case 3:
                response = _context.sent;
                cancelRequest = null;
                _user = _objectSpread$1(_objectSpread$1({}, response.data.user), {}, {
                  _ready: true
                });
                setUser(_user);
                setUserContext(_user);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", handleError(_context.t0));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return user;
};

exports.LoginPage = LoginPage;
exports.LogoutPage = LogoutPage;
exports.ResetPage = ResetPage;
exports.SessionContext = SessionContext;
exports.SessionContextProvider = SessionContextProvider;
exports.SignupPage = SignupPage;
exports.UserContext = UserContext;
exports.UserContextProvider = UserContextProvider;
exports.useData = useData;
exports.useRedirect = useRedirect;
exports.useRequireAuth = useRequireAuth;
exports.useSession = useSession;
exports.useSessionContext = useSessionContext;
exports.useUser = useUser;
exports.useUserContext = useUserContext;
