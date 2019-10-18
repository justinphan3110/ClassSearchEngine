package classearch.search.App;

import classearch.search.API.Meeting;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(ClassInfoController.URI)
public class ClassInfoController {
    public static final String URI = "class";

    @RequestMapping(value = "{collection}/{code}")
    public List<Meeting> SearchController(@PathVariable String collection, @PathVariable String code) throws IOException {

        return SearchApplication.classInfoAPI.classInfo(collection, code);
    }


}
