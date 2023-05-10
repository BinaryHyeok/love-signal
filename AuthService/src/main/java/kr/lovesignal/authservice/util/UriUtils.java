package kr.lovesignal.authservice.util;

import kr.lovesignal.authservice.exception.CustomException;
import kr.lovesignal.authservice.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UriUtils {

    private final DiscoveryClient discoveryClient;

    public String getServiceUri(String serviceName){
        List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
        if (instances != null && !instances.isEmpty()) {
            return instances.get(0).getUri().toString();
        }
        throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
    }
}
