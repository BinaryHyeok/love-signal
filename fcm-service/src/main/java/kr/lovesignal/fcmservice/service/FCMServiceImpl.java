package kr.lovesignal.fcmservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;

import kr.lovesignal.fcmservice.entity.FCMEntity;
import kr.lovesignal.fcmservice.model.request.TokenRequest;
import kr.lovesignal.fcmservice.repository.FCMRepository;

@Service
public class FCMServiceImpl implements FCMService{

	private final FCMRepository fcmRepository;

	public FCMServiceImpl(FCMRepository fcmRepository) {
		this.fcmRepository = fcmRepository;
	}

	@Override
	public void registerToken(TokenRequest tokenRequest) {

		UUID memberUUID = UUID.fromString(tokenRequest.getMemberUUID());
		FCMEntity existingEntity = fcmRepository.findByMemberUUID(memberUUID);

		if(existingEntity != null){
			fcmRepository.delete(existingEntity);
		}

		FCMEntity fcmEntity = new FCMEntity();
		fcmEntity.setMemberUUID(memberUUID);
		fcmEntity.setToken(tokenRequest.getToken());
		fcmRepository.save(fcmEntity);
	}

	@Override
	public void sendNotification(List<UUID> memberUUIDs) {

		List<FCMEntity> fcmEntities = fcmRepository.findAllByMemberUUIDIn(memberUUIDs);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
					.putData("title", "선택의 시간")
					.putData("content", "지금부터 10시 30분까지 마음에 드는 이성을 선택할 수 있습니다.")
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
		List<FCMEntity> fcmEntities = fcmRepository.findAllByMemberUUIDIn(memberUUIDs);

		for(FCMEntity fcmEntity : fcmEntities){
			if(fcmEntity.getToken() != null){
				Message message = Message.builder()
					.putData("title", "팀 빌딩 완료")
					.putData("content", "팀 빌딩이 완료되었고 동성 채팅방이 생성되었습니다.")
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

}
