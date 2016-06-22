package inacap.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentRequest {

    public String body;

    public void validate() throws Exception {
        if (body == null || body.isEmpty()) throw new Exception("Comment body required");
    }

}
