// eslint-disable-next-line react/prop-types
const InfoSection = ({ isLoginPage, onToggle }) => (
  <div className="w-full max-w-xl p-6 text-center text-white">
    <h2 className="text-5xl font-bold mb-4">
      {isLoginPage ? "New to GreenCare?" : "Already have an account?"}
    </h2>
    <p className="mb-4 text-2xl font-new-amsterdam rounded-3xl p-3 text-zinc-400">
      {isLoginPage
        ? "Join us today and start your journey towards a greener, healthier lifestyle. Let's nurture."
        : "Welcome back! Log in to continue nurturing your plants and enjoy the green community. Grow and Learn"}
    </p>
    <button
      onClick={onToggle}
      className="bg-info py-3 px-8 text-xl rounded-lg font-semibold text-white hover:bg-greenish transition duration-300"
    >
      {isLoginPage ? "Create an Account" : "Log In"}
    </button>
  </div>
);

export default InfoSection;
