import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { AuthProvider } from "./lib/authContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { EmailCapture } from "./components/EmailCapture";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import Staff from "./pages/Staff";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Founder from "./pages/Founder";
import Guidelines from "./pages/Guidelines";
import Referrals from "./pages/Referrals";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Changelog from "./pages/Changelog";

// Fixes: pages opening scrolled to the bottom instead of the top.
// wouter (like most SPA routers) doesn't reset scroll position on navigation
// by default — the browser keeps whatever scroll offset the previous page had.
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <EmailCapture />
    </>
  );
}

function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-6xl font-extrabold text-slate-900 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-700 mb-6">Page not found</h1>
          <a href="/" className="btn-primary px-6 py-3 rounded-xl text-sm inline-block">Go Home</a>
        </div>
      </div>
    </PageWrapper>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <PageWrapper><Home /></PageWrapper>} />
      <Route path="/tools" component={() => <PageWrapper><Tools /></PageWrapper>} />
      <Route path="/tools/:slug">{(params) => <PageWrapper><ToolDetail params={params} /></PageWrapper>}</Route>
      <Route path="/staff" component={() => <PageWrapper><Staff /></PageWrapper>} />
      <Route path="/pricing" component={() => <PageWrapper><Pricing /></PageWrapper>} />
      <Route path="/blog" component={() => <PageWrapper><Blog /></PageWrapper>} />
      <Route path="/blog/:slug" component={() => <PageWrapper><BlogPost /></PageWrapper>} />
      <Route path="/dashboard" component={() => <PageWrapper><Dashboard /></PageWrapper>} />
      <Route path="/login" component={() => <PageWrapper><Login /></PageWrapper>} />
      <Route path="/signup" component={() => <PageWrapper><Signup /></PageWrapper>} />
      <Route path="/about" component={() => <PageWrapper><About /></PageWrapper>} />
      <Route path="/faq" component={() => <PageWrapper><FAQ /></PageWrapper>} />
      <Route path="/founder" component={() => <PageWrapper><Founder /></PageWrapper>} />
      <Route path="/guidelines" component={() => <PageWrapper><Guidelines /></PageWrapper>} />
      <Route path="/referrals" component={() => <PageWrapper><Referrals /></PageWrapper>} />
      <Route path="/reset-password" component={() => <PageWrapper><ResetPassword /></PageWrapper>} />
      <Route path="/terms" component={() => <PageWrapper><Terms /></PageWrapper>} />
      <Route path="/privacy" component={() => <PageWrapper><Privacy /></PageWrapper>} />
      <Route path="/verify-email" component={() => <PageWrapper><VerifyEmail /></PageWrapper>} />
      <Route path="/contact" component={() => <PageWrapper><Contact /></PageWrapper>} />
      <Route path="/careers" component={() => <PageWrapper><Careers /></PageWrapper>} />
      <Route path="/changelog" component={() => <PageWrapper><Changelog /></PageWrapper>} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Router />
    </AuthProvider>
  );
}
