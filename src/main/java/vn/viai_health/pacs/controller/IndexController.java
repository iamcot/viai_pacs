package vn.viai_health.pacs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {   

    @GetMapping({"/", "/{path:[^\\.]*}"}) // Bắt tất cả các path trừ các file có dấu chấm (vd: .html, .css)
    public String forwardToIndex() {
        return "forward:/index-cdn.html"; // Chuyển hướng về index.html của SPA
    }

}
