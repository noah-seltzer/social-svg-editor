import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
    //   [api.reducerPath]: api.reducer,
    //   localization: localizationReducer,
    //   design: designReducer,
    //   stitch: stitchReducer,
    //   dashboard: dashboardReducer,
    //   websiteBuilder: websiteBuilderReducer,
    //   domainRegistry: domainRegistry,
    //   logoEditor: logoEditorReducer,
    //   logoResizer: logoResizerReducer,
    //   checkout: checkoutReducer,
    },
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        // NOTE: Since this can receive actions with functions inside,
        // it should go before the serializability check middleware
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch)
  