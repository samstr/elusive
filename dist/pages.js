'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-e7f8ebd1.js');
var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
var index$1 = require('./index.js');
require('./errors-6d843f19.js');
require('./utils-8eb11d51.js');
require('./asyncToGenerator-093ecb8b.js');
require('bcryptjs');
require('./utils-f3ba8179.js');
var utils$1$1 = require('./utils-57a97bcb.js');
var utils$2 = require('./utils-2db396be.js');
var React = require('react');
var React__default = _interopDefault(React);
var SignupForm = require('./SignupForm-dbffbd46.js');
require('prop-types');
var reactBootstrap = require('react-bootstrap');
require('clsx');
var Link$3 = _interopDefault(require('next/link'));
var router = require('next/router');
require('react-dom');
require('axios');
require('./signupForm-d7904e62.js');
require('./UserContext-41109d68.js');
require('./utils-cb2ac89c.js');
var useSession = require('./useSession-1b61d6ad.js');

var __jsx = React__default.createElement;

var LoginPage = function LoginPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();

  var _useState = React.useState(),
      type = _useState[0],
      setType = _useState[1];

  var _useState2 = React.useState(),
      success = _useState2[0],
      setSuccess = _useState2[1];

  var _Elusive$options = index$1.options,
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

  return __jsx(SignupForm.AuthBasePage, null, type === utils$2.LOGIN_TYPE_PASSWORD && __jsx(React__default.Fragment, null, __jsx("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx("div", {
    className: "jsx-1275567024" + " " + "form"
  }, __jsx(SignupForm.LoginWithPasswordForm, {
    onSuccess: onPasswordSuccess
  })), __jsx("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx(Link$3, {
    href: utils$1$1.resetRoute()
  }, __jsx("a", {
    className: "jsx-1275567024"
  }, "Forgot your password?")), "\xA0\xA0\u2022\xA0\xA0", __jsx(Link$3, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx("a", {
    className: "jsx-1275567024"
  }, "Email me a login link")))), type === utils$2.LOGIN_TYPE_LINK && __jsx(React__default.Fragment, null, success ? __jsx(React__default.Fragment, null, __jsx("h1", {
    className: "jsx-1275567024"
  }, "Check your inbox"), __jsx("div", {
    className: "jsx-1275567024" + " " + "intro"
  }, __jsx("p", {
    className: "jsx-1275567024"
  }, "We have sent you an email with an automatic login link."), __jsx("p", {
    className: "jsx-1275567024"
  }, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx(React__default.Fragment, null, __jsx("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx("div", {
    className: "jsx-1275567024" + " " + "form"
  }, __jsx(SignupForm.LoginWithLinkForm, {
    onSuccess: onLinkSuccess
  })), __jsx("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx(Link$3, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx("a", {
    className: "jsx-1275567024"
  }, "Use password"))))), !type && __jsx(React__default.Fragment, null, __jsx("h1", {
    className: "jsx-1275567024"
  }, "How do you want to login?"), __jsx("div", {
    className: "jsx-1275567024" + " " + "options"
  }, __jsx(Link$3, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx("img", {
    src: "/img/icons/password-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Login with my password"))), __jsx(Link$3, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx("img", {
    src: "/img/icons/email-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Email me a login link")))), __jsx("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx(Link$3, {
    href: utils$1$1.signupRoute()
  }, __jsx("a", {
    className: "jsx-1275567024"
  }, "Create an account instead")))), __jsx(SignupForm.style, {
    id: "1275567024"
  }, ".options.jsx-1275567024{text-align:center;}a.option.jsx-1275567024{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;vertical-align:top;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;justify-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:150px;height:150px;border:2px solid #78a7e6;border-radius:3px;margin:0 12px;padding:20px;font-weight:bold;cursor:pointer;-webkit-transition:0.15s ease-in-out -webkit-transform, 0.15s ease-in-out border-color;-webkit-transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;background-color:#fff;font-size:16px;}a.option.jsx-1275567024:hover{border-color:#f90;-webkit-text-decoration:none;text-decoration:none;-webkit-transform:scale(1.025);-ms-transform:scale(1.025);transform:scale(1.025);-webkit-text-decoration:none !important;text-decoration:none !important;}.icon.jsx-1275567024{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.text.jsx-1275567024{margin-top:10px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luUGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3SWtCLEFBRzZCLEFBSUUsQUFxQkYsQUFPWCxBQUtTLGdCQUNsQixFQXJDQSxBQXlCdUIsZUFPUixtQ0FOVSxrQ0F0QkQsS0E2QnhCLDBDQU5rQywrQkF0QmIsbUJBQ0Esc0JBc0JyQix1RUFyQnVCLHFCQUNFLG1HQUNYLFlBQ0MsYUFDWSx5QkFDUCxrQkFDSixjQUNELGFBQ0ksaUJBQ0YsZUFFaUIsNk9BQ1Ysc0JBQ1AsZUFDakIiLCJmaWxlIjoiTG9naW5QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRWx1c2l2ZSBmcm9tICcuLi8nO1xuaW1wb3J0IHsgTE9HSU5fVFlQRV9MSU5LLCBMT0dJTl9UWVBFX1BBU1NXT1JELCBMT0dJTl9UWVBFUyB9IGZyb20gJy4uL2F1dGgnO1xuaW1wb3J0IHtcbiAgQXV0aEJhc2VQYWdlLFxuICBMb2dpbldpdGhMaW5rRm9ybSxcbiAgTG9naW5XaXRoUGFzc3dvcmRGb3JtLFxufSBmcm9tICcuLi9jb21wb25lbnRzJztcbmltcG9ydCB7IHVzZVNlc3Npb24gfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBob21lUm91dGUsIGxvZ2luUm91dGUsIHJlc2V0Um91dGUsIHNpZ251cFJvdXRlIH0gZnJvbSAnLi4vcm91dGVzJztcblxuY29uc3QgTG9naW5QYWdlID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IHVzZVNlc3Npb24oKTtcbiAgY29uc3QgW3R5cGUsIHNldFR5cGVdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgeyBtYWlsOiBtYWlsT3B0aW9ucywgc2l0ZTogc2l0ZU9wdGlvbnMgfSA9IEVsdXNpdmUub3B0aW9ucztcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyb3V0ZXIucXVlcnkudHlwZSkge1xuICAgICAgaWYgKExPR0lOX1RZUEVTLmluY2x1ZGVzKHJvdXRlci5xdWVyeS50eXBlKSkge1xuICAgICAgICBzZXRUeXBlKHJvdXRlci5xdWVyeS50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlci5yZXBsYWNlKGxvZ2luUm91dGUoKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFR5cGUoKTtcbiAgICAgIHNldFN1Y2Nlc3MoKTtcbiAgICB9XG4gIH0sIFtyb3V0ZXIucXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uLl9yZWFkeSAmJiBzZXNzaW9uLmlzQXV0aGVudGljYXRlZCkge1xuICAgICAgcm91dGVyLnJlcGxhY2UoaG9tZVJvdXRlKCkpO1xuICAgIH1cbiAgfSwgW3Nlc3Npb25dKTtcblxuICBjb25zdCBsb2dpblR5cGVSb3V0ZVdpdGhOZXh0ID0gKHR5cGUpID0+IHtcbiAgICBsZXQgdXJsID0gYCR7bG9naW5Sb3V0ZSgpfT90eXBlPSR7dHlwZX1gO1xuXG4gICAgaWYgKHJvdXRlci5xdWVyeS5uZXh0KSB7XG4gICAgICB1cmwgPSBgJHt1cmx9Jm5leHQ9JHtlbmNvZGVVUklDb21wb25lbnQocm91dGVyLnF1ZXJ5Lm5leHQpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBjb25zdCBvblBhc3N3b3JkU3VjY2VzcyA9ICgpID0+IHtcbiAgICBsZXQgbmV4dCA9IGhvbWVSb3V0ZSgpO1xuICAgIGlmIChyb3V0ZXIucXVlcnkubmV4dCkge1xuICAgICAgbmV4dCA9IGRlY29kZVVSSUNvbXBvbmVudChyb3V0ZXIucXVlcnkubmV4dCk7XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5leHQ7XG4gIH07XG5cbiAgY29uc3Qgb25MaW5rU3VjY2VzcyA9ICgpID0+IHNldFN1Y2Nlc3ModHJ1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aEJhc2VQYWdlPlxuICAgICAge3R5cGUgPT09IExPR0lOX1RZUEVfUEFTU1dPUkQgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxoMT5Mb2dpbiB0byB7c2l0ZU9wdGlvbnMubmFtZX08L2gxPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgPExvZ2luV2l0aFBhc3N3b3JkRm9ybSBvblN1Y2Nlc3M9e29uUGFzc3dvcmRTdWNjZXNzfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICA8TGluayBocmVmPXtyZXNldFJvdXRlKCl9PlxuICAgICAgICAgICAgICA8YT5Gb3Jnb3QgeW91ciBwYXNzd29yZD88L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAmbmJzcDsmbmJzcDsmYnVsbDsmbmJzcDsmbmJzcDtcbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e2xvZ2luVHlwZVJvdXRlV2l0aE5leHQoTE9HSU5fVFlQRV9MSU5LKX0+XG4gICAgICAgICAgICAgIDxhPkVtYWlsIG1lIGEgbG9naW4gbGluazwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09IExPR0lOX1RZUEVfTElOSyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge3N1Y2Nlc3MgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aDE+Q2hlY2sgeW91ciBpbmJveDwvaDE+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm9cIj5cbiAgICAgICAgICAgICAgICA8cD5XZSBoYXZlIHNlbnQgeW91IGFuIGVtYWlsIHdpdGggYW4gYXV0b21hdGljIGxvZ2luIGxpbmsuPC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgWW91IG1heSBuZWVkIHRvIGNoZWNrIHlvdXIgc3BhbSBmb2xkZXIgb3Igd2hpdGVsaXN0eycgJ31cbiAgICAgICAgICAgICAgICAgIHttYWlsT3B0aW9ucy5mcm9tRW1haWx9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aDE+TG9naW4gdG8ge3NpdGVPcHRpb25zLm5hbWV9PC9oMT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPExvZ2luV2l0aExpbmtGb3JtIG9uU3VjY2Vzcz17b25MaW5rU3VjY2Vzc30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj17bG9naW5UeXBlUm91dGVXaXRoTmV4dChMT0dJTl9UWVBFX1BBU1NXT1JEKX0+XG4gICAgICAgICAgICAgICAgICA8YT5Vc2UgcGFzc3dvcmQ8L2E+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICAgIHshdHlwZSAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGgxPkhvdyBkbyB5b3Ugd2FudCB0byBsb2dpbj88L2gxPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgPExpbmsgaHJlZj17bG9naW5UeXBlUm91dGVXaXRoTmV4dChMT0dJTl9UWVBFX1BBU1NXT1JEKX0+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaW1nL2ljb25zL3Bhc3N3b3JkLTFhNzNlOC5zdmdcIiB3aWR0aD1cIjM4XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRcIj5Mb2dpbiB3aXRoIG15IHBhc3N3b3JkPC9kaXY+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e2xvZ2luVHlwZVJvdXRlV2l0aE5leHQoTE9HSU5fVFlQRV9MSU5LKX0+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaW1nL2ljb25zL2VtYWlsLTFhNzNlOC5zdmdcIiB3aWR0aD1cIjM4XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRcIj5FbWFpbCBtZSBhIGxvZ2luIGxpbms8L2Rpdj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICA8TGluayBocmVmPXtzaWdudXBSb3V0ZSgpfT5cbiAgICAgICAgICAgICAgPGE+Q3JlYXRlIGFuIGFjY291bnQgaW5zdGVhZDwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApfVxuXG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5vcHRpb25zIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhLm9wdGlvbiB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxNTBweDtcbiAgICAgICAgICBoZWlnaHQ6IDE1MHB4O1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM3OGE3ZTY7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgIG1hcmdpbjogMCAxMnB4O1xuICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHRyYW5zaXRpb246IDAuMTVzIGVhc2UtaW4tb3V0IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIDAuMTVzIGVhc2UtaW4tb3V0IGJvcmRlci1jb2xvcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgIGEub3B0aW9uOmhvdmVyIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNmOTA7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wMjUpO1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLmljb24ge1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50ZXh0IHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9BdXRoQmFzZVBhZ2U+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dpblBhZ2U7XG4iXX0= */\n/*@ sourceURL=LoginPage.js */"));
};

var __jsx$1 = React__default.createElement;

var LogoutPage = function LogoutPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router$1.replace(utils$1$1.loginRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    window.location = utils$1$1.indexRoute();
  };

  return __jsx$1(SignupForm.AuthBasePage, null, __jsx$1("h1", null, "Logout"), __jsx$1("div", {
    className: "intro"
  }, "Are sure you want to logout?"), __jsx$1("div", {
    className: "form"
  }, __jsx$1(SignupForm.LogoutForm, {
    onSuccess: onSuccess
  })));
};

var __jsx$2 = React__default.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MagicLoginPage = function MagicLoginPage() {
  var data = useSession.useData();
  var router$1 = router.useRouter();

  var _useSessionContext = useSession.useSessionContext(),
      setSessionContext = _useSessionContext.setSessionContext;

  var errors = data === null || data === void 0 ? void 0 : data.errors;
  React.useEffect(function () {
    if (data === null || data === void 0 ? void 0 : data.session) {
      var _data$session$claims, _data$session$claims$;

      setSessionContext(_objectSpread(_objectSpread({}, data.session), {}, {
        _ready: true
      }));

      if ((_data$session$claims = data.session.claims) === null || _data$session$claims === void 0 ? void 0 : (_data$session$claims$ = _data$session$claims.user) === null || _data$session$claims$ === void 0 ? void 0 : _data$session$claims$.needsOnboarding) {
        router$1.replace(utils$1$1.onboardingRoute());
      } else if (router$1.query.next) {
        window.location = decodeURIComponent(router$1.query.next);
      } else {
        router$1.replace(utils$1$1.homeRoute());
      }
    }
  }, [data]);
  return __jsx$2(SignupForm.AuthBasePage, null, data && errors ? __jsx$2(React__default.Fragment, null, __jsx$2("h1", null, "There was a problem"), __jsx$2(SignupForm.GenericErrors, {
    errors: errors
  })) : __jsx$2(reactBootstrap.Spinner, {
    animation: "border",
    role: "status",
    variant: "primary"
  }));
};

var __jsx$3 = React__default.createElement;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OnboardingPage = function OnboardingPage() {
  var _session$claims, _session$claims$user;

  useSession.useRequireAuth();
  var session = useSession.useSession();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var _useSessionContext = useSession.useSessionContext(),
      setSessionContext = _useSessionContext.setSessionContext;

  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      var user = session.claims.user;

      if (!user.needsOnboarding) {
        setSuccess(true);
      }
    }
  }, [session._ready]);

  var onSuccess = function onSuccess(data) {
    setSessionContext(_objectSpread$1(_objectSpread$1({}, data.session), {}, {
      _ready: true
    }));
    setSuccess(true);
  };

  return __jsx$3(SignupForm.AuthBasePage, null, session._ready ? __jsx$3(React__default.Fragment, null, success ? __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "What next?"), __jsx$3("div", {
    className: "options"
  }, __jsx$3(Link$3, {
    href: utils$1$1.settingsProfileRoute()
  }, __jsx$3("a", {
    className: "option"
  }, __jsx$3("div", {
    className: "icon"
  }, __jsx$3("img", {
    src: "/img/icons/user-1a73e8.svg",
    width: "38"
  })), __jsx$3("div", {
    className: "details"
  }, __jsx$3("div", {
    className: "heading"
  }, "Setup your profile"), __jsx$3("div", {
    className: "description"
  }, "Whether you're a creator or a fan, the next step is to set your name and picture. Click here to edit your profile.")))))) : __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Create a password"), __jsx$3("div", {
    className: "intro"
  }, "Let's create a password for you to use when you login"), __jsx$3("div", {
    className: "form"
  }, __jsx$3(SignupForm.OnboardingForm, {
    email: (session === null || session === void 0 ? void 0 : (_session$claims = session.claims) === null || _session$claims === void 0 ? void 0 : (_session$claims$user = _session$claims.user) === null || _session$claims$user === void 0 ? void 0 : _session$claims$user.email) || '',
    onSuccess: onSuccess
  })))) : __jsx$3(reactBootstrap.Spinner, {
    animation: "border",
    role: "status",
    variant: "primary"
  }));
};

var __jsx$4 = React__default.createElement;

var ResetPage = function ResetPage() {
  useSession.useSession();
  var mailOptions = index$1.options.mail;

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$4(SignupForm.AuthBasePage, null, success ? __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Check your inbox"), __jsx$4("div", {
    className: "intro"
  }, __jsx$4("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$4("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Forgot your password?"), __jsx$4("div", {
    className: "form"
  }, __jsx$4(SignupForm.ResetForm, {
    onSuccess: onSuccess
  }))));
};

var __jsx$5 = React__default.createElement;

var SignupPage = function SignupPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();
  var mailOptions = index$1.options.mail;
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

  return __jsx$5(SignupForm.AuthBasePage, null, success ? __jsx$5(React__default.Fragment, null, __jsx$5("h1", null, "Check your inbox"), __jsx$5("div", {
    className: "intro"
  }, __jsx$5("p", null, "Please confirm your email address to get started."), __jsx$5("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$5(React__default.Fragment, null, __jsx$5("h1", null, "Create an account"), __jsx$5("div", {
    className: "form"
  }, __jsx$5(SignupForm.SignupForm, {
    onSuccess: onSuccess
  })), __jsx$5("div", {
    className: "footer"
  }, __jsx$5(Link$3, {
    href: utils$1$1.loginRoute()
  }, __jsx$5("a", null, "I already have an account")))));
};

exports.LoginPage = LoginPage;
exports.LogoutPage = LogoutPage;
exports.MagicLoginPage = MagicLoginPage;
exports.OnboardingPage = OnboardingPage;
exports.ResetPage = ResetPage;
exports.SignupPage = SignupPage;
