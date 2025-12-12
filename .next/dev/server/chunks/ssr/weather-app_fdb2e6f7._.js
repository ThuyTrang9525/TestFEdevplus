module.exports = [
"[project]/weather-app/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/weather-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/Header'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/SearchSection'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/WeatherContent'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
function Page() {
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("metric");
    const [weatherData, setWeatherData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Tuesday");
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (location)=>{
        setLoading(true);
        setError(null);
        try {
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            const mockData = {
                location: location || "Berlin, Germany",
                date: "Tuesday, Aug 5, 2025",
                temperature: unit === "metric" ? 20 : 68,
                feelsLike: unit === "metric" ? 18 : 64,
                humidity: 46,
                wind: unit === "metric" ? 14 : 9,
                windUnit: unit === "metric" ? "km/h" : "mph",
                precipitation: unit === "metric" ? 0 : 0,
                precipitationUnit: unit === "metric" ? "mm" : "in",
                icon: "☀️",
                hourly: [
                    {
                        time: "3 PM",
                        temp: unit === "metric" ? 20 : 68,
                        icon: "☁️"
                    },
                    {
                        time: "4 PM",
                        temp: unit === "metric" ? 20 : 68,
                        icon: "☁️"
                    },
                    {
                        time: "5 PM",
                        temp: unit === "metric" ? 20 : 68,
                        icon: "⛅"
                    },
                    {
                        time: "6 PM",
                        temp: unit === "metric" ? 19 : 66,
                        icon: "☁️"
                    },
                    {
                        time: "7 PM",
                        temp: unit === "metric" ? 18 : 64,
                        icon: "☁️"
                    },
                    {
                        time: "8 PM",
                        temp: unit === "metric" ? 18 : 64,
                        icon: "🌊"
                    },
                    {
                        time: "9 PM",
                        temp: unit === "metric" ? 17 : 63,
                        icon: "☁️"
                    },
                    {
                        time: "10 PM",
                        temp: unit === "metric" ? 17 : 63,
                        icon: "☁️"
                    }
                ],
                daily: [
                    {
                        day: "Tue",
                        icon: "☁️",
                        high: unit === "metric" ? 20 : 68,
                        low: unit === "metric" ? 14 : 57
                    },
                    {
                        day: "Wed",
                        icon: "🌧️",
                        high: unit === "metric" ? 21 : 70,
                        low: unit === "metric" ? 15 : 59
                    },
                    {
                        day: "Thu",
                        icon: "☀️",
                        high: unit === "metric" ? 24 : 75,
                        low: unit === "metric" ? 14 : 57
                    },
                    {
                        day: "Fri",
                        icon: "⛅",
                        high: unit === "metric" ? 25 : 77,
                        low: unit === "metric" ? 13 : 55
                    },
                    {
                        day: "Sat",
                        icon: "🌧️",
                        high: unit === "metric" ? 21 : 70,
                        low: unit === "metric" ? 15 : 59
                    },
                    {
                        day: "Sun",
                        icon: "🌊",
                        high: unit === "metric" ? 25 : 77,
                        low: unit === "metric" ? 16 : 61
                    },
                    {
                        day: "Mon",
                        icon: "🌊",
                        high: unit === "metric" ? 24 : 75,
                        low: unit === "metric" ? 15 : 59
                    }
                ]
            };
            setWeatherData(mockData);
            setSearchResults([]);
        } catch (err) {
            setError("We couldn't connect to the server (API error). Please try again in a few moments.");
        } finally{
            setLoading(false);
        }
    }, [
        unit
    ]);
    const handleSearchChange = (value)=>{
        if (value.trim()) {
            setSearchResults([
                `${value}`,
                `${value}, France`,
                `${value}, Germany`,
                `${value}, USA`
            ]);
        } else {
            setSearchResults([]);
        }
    };
    const handleSelectLocation = (location)=>{
        setSearchResults([]);
        handleSearch(location);
    };
    const handleUnitChange = (newUnit)=>{
        setUnit(newUnit);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-950",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                unit: unit,
                onUnitChange: handleUnitChange
            }, void 0, false, {
                fileName: "[project]/weather-app/app/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-4 py-8 md:py-12 max-w-7xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchSection, {
                        onSearch: handleSearch,
                        onSearchChange: handleSearchChange,
                        searchResults: searchResults,
                        onSelectLocation: handleSelectLocation,
                        loading: loading
                    }, void 0, false, {
                        fileName: "[project]/weather-app/app/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$weather$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeatherContent, {
                        weatherData: weatherData,
                        loading: loading,
                        error: error,
                        onRetry: ()=>handleSearch(weatherData?.location),
                        selectedDay: selectedDay,
                        onSelectDay: setSelectedDay
                    }, void 0, false, {
                        fileName: "[project]/weather-app/app/page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/weather-app/app/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/weather-app/app/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
}),
"[project]/weather-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/weather-app/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=weather-app_fdb2e6f7._.js.map