// eslint-disable-next-line react/prop-types
const Input = ({ icon: Icon, error, className, ...props }) => (
  <div className="mb-4 w-full">
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
      <input
        className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 outline-none focus:border-green-500 transition-colors ${
          error ? "bg-red-100 border-red-500" : "bg-gray-200 border-gray-500"
        } ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-gray-200  text-xs mt-1">{error}</p>}
  </div>
);

export default Input;
