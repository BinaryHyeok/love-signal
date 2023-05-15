/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
// Service Worker가 설치되고 활성화될 때 호출되는 이벤트 리스너 등록
self.addEventListener("activate", (event) => {
  // 푸시 알림 관련 기능 활성화
  self.registration.pushManager
    .getSubscription()
    .then((subscription) => {
      if (subscription) {
        // 이미 구독한 경우, 서버로 구독 정보를 전송하는 등의 추가 작업 수행
      } else {
        // 구독하지 않은 경우, 푸시 알림 구독 요청
        self.registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            // =========== 서버 키 확인 필요.
            applicationServerKey: process.env.REACT_APP_PUSH_VAPID,
          })
          .then((subscription) => {
            console.log(" ======== Service-worker 구독 정보 : ", subscription);
            // 서버로 구독 정보를 전송하는 등의 추가 작업 수행
          })
          .catch((error) => {
            console.error("푸시 알림 구독 오류:", error);
          });
      }
    })
    .catch((error) => {
      console.error("푸시 알림 구독 정보 확인 오류:", error);
    });

  // 새로운 Service Worker를 제어하기 위해 즉시 클라이언트를 가져옴
  event.waitUntil(self.clients.claim());
});

// 푸시알림 이벤트 리스너 등록
self.addEventListener("push", (event) => {
  // 푸시 메시지의 내용 추출
  const payload = event.data ? event.data.text() : "no payload";
  console.log("pwa service-worker push msg : ", payload);

  // 푸시 알림 표시
  event.waitUntil(
    self.registration.showNotification("푸시 알림", {
      body: payload,
    })
  );
});
