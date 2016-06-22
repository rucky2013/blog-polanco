package inacap.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PostRequest {

    public String title;
    public String body;

    public void validate() throws Exception {
        if (title == null || title.isEmpty()) throw new Exception("Post title required");
        if (title.length() > 64) throw new Exception("Post title cannot have more than 64 characters");
        if (body == null || body.isEmpty()) throw new Exception("Post body required");
    }

}
