// PushManager 구독 정보 변수
let pushSubscription = null;

// Service Worker 버전
const version = "v1";

// PushManager 구독 정보 등록
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    self.registration.pushManager.getSubscription().then((subscription) => {
      pushSubscription = subscription;
      console.log("Subscription changed.");
    })
  );
});

// 푸시 알림 수신 이벤트 등록
self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("러브다이브", {
      body: event.data.text(),
      icon: "",
      badge: "",
      data: {
        url: "",
      },
    })
  );
});

// 백그라운드 동기화 이벤트 등록
self.addEventListener("sync", (event) => {
  if (event.tag === "syncFavorites") {
    event.waitUntil(syncFavorites());
  }
});

// 즐겨찾기 동기화 함수
async function syncFavorites() {
  // 백엔드 서버와 동기화 로직
}

// 백그라운드 동기화 등록
self.addEventListener("install", (event) => {
  event.waitUntil(self.registration.sync.register("syncFavorites"));
});

// 서비스 워커 활성화
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");

  event.waitUntil(self.clients.claim());
});
