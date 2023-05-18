package kr.lovesignal.fcmservice.initializer;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FCMInitializer {

	@PostConstruct
	public void initialize(){
		try {
			InputStream serviceAccount = new ClassPathResource("love-signal-a91bc-firebase-adminsdk-fjwcw-6d06644c26.json").getInputStream();
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

			FirebaseApp.initializeApp(options);
			log.info("Firebase SDK Initialization SUCCESS");
		} catch (IOException e) {
			e.printStackTrace();
			log.info("Firebase SDK Initialization FAIL");
		}
	}
}
