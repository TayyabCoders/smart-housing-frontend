import auth from "./auth";
import dashboard from "./dashboard";
import form from "./form";
import layout from "./layout";
import pages from "./pages";
import shared from "./shared";
import loading from "./loading";
import home from "./home";
import error from "./error";
import common from "./common";
import metadata from "./metadata";
import navigation from "./navigation";
import time from "./time";
import chat from "./chat";
import surveillance from "./surveillance";

const messages = {
  auth,
  dashboard,
  form,
  layout,
  pages,
  shared,
  loading,
  home,
  error,
  common,
  metadata,
  navigation,
  time,
  chat,
  surveillance,
} as const;

export default messages;
export type Messages = typeof messages;
