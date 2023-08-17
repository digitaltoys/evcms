const LoadingSpinner = () => {
  return (
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          stroke="currentColor"
          stroke-width="4"
          cx="12"
          cy="12"
          r="10"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
