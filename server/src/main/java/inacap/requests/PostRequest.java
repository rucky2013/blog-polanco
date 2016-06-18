package inacap.requests;

public class PostRequest {

    public String title;
    public String body;

    public void validate() throws Exception {
        if (title == null || title.isEmpty()) throw new Exception("Title required.");
        if(title.length() > 64) throw new Exception("Title 64 characters max length.");
        if (body == null || body.isEmpty()) throw new Exception("Body required.");
    }

}
