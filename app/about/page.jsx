const LOGO_URL = "https://z-cdn-media.chatglm.cn/files/f57e5ecf-3851-451b-85be-81edc12550ec.png?auth_key=1880958256-a4ec5c83ad274ef88c40ebf635d53c56-0-77f68c8df2516c58efa9b22ef1eebc1e";

export default function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <img src={LOGO_URL} alt="AffiliatePilot Logo" className="h-24 w-auto mx-auto mb-8" />
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">About AffiliatePilot</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          AffiliatePilot is India's first AI-powered shopping assistant built to save you time and money. Founded by <span className="font-bold text-blue-600">Hamdan</span>, our engine scans millions of products across Amazon, Flipkart, and 6 other platforms to find you the lowest prices instantly.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          From finding that trendy product you saw on an Instagram Reel, to generating real-time coupons and price drop alerts, AffiliatePilot is your smart shopping co-pilot.
        </p>
        <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Back to Tools</a>
      </div>
    </div>
  );
}
