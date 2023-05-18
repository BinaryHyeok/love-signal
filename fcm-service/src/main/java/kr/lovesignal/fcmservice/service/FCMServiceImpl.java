package kr.lovesignal.fcmservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;


import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;

import kr.lovesignal.fcmservice.entity.FCMEntity;
import kr.lovesignal.fcmservice.model.request.TokenRequest;
import kr.lovesignal.fcmservice.repository.FCMRepository;


@Service
@Transactional
public class FCMServiceImpl implements FCMService{

	private final FCMRepository fcmRepository;

	public FCMServiceImpl(FCMRepository fcmRepository) {
		this.fcmRepository = fcmRepository;
	}

	@Override
	public void registerToken(TokenRequest tokenRequest) {


		UUID memberUUID = UUID.fromString(tokenRequest.getMemberUUID());
		String token = tokenRequest.getToken();
		String nickname = tokenRequest.getNickname();


//		Optional<FCMEntity> existingEntityOpt = fcmRepository.findByMemberUUID(memberUUID);
		FCMEntity findFcm = fcmRepository.findByUUID(memberUUID);

		System.out.println("*******************************");
		System.out.println(tokenRequest.getMemberUUID());
		System.out.println(tokenRequest.getToken());
		System.out.println(tokenRequest.getNickname());
		System.out.println("==============================");
		System.out.println(findFcm);
		System.out.println("==============================");
		System.out.println("*******************************");

		if(findFcm == null){
			createToken(memberUUID, token, nickname);
			System.out.println("저장됨");
		}
		else{
			updateToken(findFcm, token);
			System.out.println("업데이트됨");
		}

//		if(existingEntityOpt.isPresent()) {
//			existingEntityOpt.get().setToken(token);
//			fcmRepository.save(existingEntityOpt.get());
////			FCMEntity fcmEntity = existingEntityOpt.get();
////			fcmEntity.setToken(token);
////			fcmRepository.save(fcmEntity);
//		}else {
//			FCMEntity fcmEntity = tokenRequest.toEntity(memberUUID);
//	        fcmRepository.save(fcmEntity);
//		}
//		System.out.println("*******************************");
	}

	public void createToken(UUID memberUUID, String token, String nickname){
		FCMEntity saveFcm = FCMEntity.builder()
				.UUID(memberUUID)
				.token(token)
				.nickname(nickname)
				.build();

		fcmRepository.save(saveFcm);

	}

	public void updateToken(FCMEntity fcmEntity, String token){
		FCMEntity saveFcm = FCMEntity.builder()
				.fcmId(fcmEntity.getFcmId())
				.UUID(fcmEntity.getUUID())
				.token(token)
				.nickname(fcmEntity.getNickname())
				.build();

		fcmRepository.save(saveFcm);
	}

	@Override
	public void sendNotification(List<UUID> memberUUIDs) {

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDs);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
					.putData("title", "선택의 시간!")
					.putData("content", "지금부터 마음에 드는 이성을 선택할 수 있어요")
					.putData("type", "select")
					.setToken(fcmEntity.getToken())
					.build();

				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void sendBuildingNotification(List<UUID> memberUUIDs) {
		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDs);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
					.putData("title", "팀 빌딩!")
					.putData("content", "팀 빌딩이 완료 되었어요, 이성팀에게 미팅을 신청해보세요!")
					.putData("type", "build")
					.setToken(fcmEntity.getToken())
					.build();

				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}


	@Override
	public void sendMeetingNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
					.putData("title", "시그널!")
					.putData("content", "상대팀과의 미팅이 성사되었어요, 시그널을 보내세요!")
					.putData("type", "meeting")
					.setToken(fcmEntity.getToken())
					.build();

				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void sendTeamRemoveNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
						.putData("title", "팀 해체!")
						.putData("content", "팀이 해체되었어요, 다른 팀을 구해보세요!")
						.putData("type", "teamEnd")
						.setToken(fcmEntity.getToken())
						.build();

				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void sendMeetingRemoveNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
						.putData("title", "미팅 종료!")
						.putData("content", "미팅이 끝났어요, 인연을 만나셨나요?")
						.putData("type", "meetingEnd")
						.setToken(fcmEntity.getToken())
						.build();
				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void sendSignalNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
						.putData("title", "시그널 성공!")
						.putData("content", "시그널 채팅방이 생성되었어요!, 서로의 마음을 좀 더 확인해보세요!")
						.putData("type", "signal")
						.setToken(fcmEntity.getToken())
						.build();
				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void sendSecretNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
						.putData("title", "익명 채팅방 생성!")
						.putData("content", "익명 채팅방이 생성되었어요, 서로에 대해 알아보세요!")
						.putData("type", "secret")
						.setToken(fcmEntity.getToken())
						.build();
				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void getMeetingNotification(List<String> memberUUIDs) {

		List<UUID> memberUUIDList = stringToUUIDList(memberUUIDs);

		List<FCMEntity> fcmEntities = fcmRepository.findAllByUUIDIn(memberUUIDList);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
						.putData("title", "미팅 신청이 도착했습니다!")
						.putData("content", "이성 팀으로부터 미팅 신청이 도착했습니다!")
						.putData("type", "getMeeting")
						.setToken(fcmEntity.getToken())
						.build();
				try {
					String response = FirebaseMessaging.getInstance().send(message);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}
	}


	public List<UUID> stringToUUIDList(List<String> memberUUIDs){
		List<UUID> memberUUIDList = new ArrayList<>();
		for(String uuidString : memberUUIDs){
			UUID uuid = UUID.fromString(uuidString);
			memberUUIDList.add(uuid);
		}
		return memberUUIDList;
	}
}
