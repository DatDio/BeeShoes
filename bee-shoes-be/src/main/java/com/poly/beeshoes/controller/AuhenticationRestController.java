package com.poly.beeshoes.controller;

import com.poly.beeshoes.dto.request.logindto.ChangePassword;
import com.poly.beeshoes.dto.request.logindto.ResetPassword;
import com.poly.beeshoes.infrastructure.common.ResponseObject;
import com.poly.beeshoes.infrastructure.exception.CustomListValidationException;
import com.poly.beeshoes.infrastructure.sercurity.auth.JwtAuhenticationResponse;
import com.poly.beeshoes.infrastructure.sercurity.auth.SignUpRequets;
import com.poly.beeshoes.infrastructure.sercurity.auth.SigninRequest;
import com.poly.beeshoes.service.AuthenticationService;
import com.poly.beeshoes.util.MailUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/login-v2")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuhenticationRestController {
    //    ahihi đồ ngốc
    @Autowired
    private MailUtils mailUtils;
    private final AuthenticationService authenticationService;
    @GetMapping("/test-mail")
    public CompletableFuture<String> testMail() {
        var res=  mailUtils.sendEmail("chenxiang110303@gmail.com", "Test Subject", "This is a test mail");
        return res;
    }
    @PostMapping("/singup")
    public String singup(@Valid @RequestBody SignUpRequets requets, BindingResult bindingResult) throws CustomListValidationException {
        if (bindingResult.hasErrors()) {
            throw new CustomListValidationException(404, bindingResult.getAllErrors());
        }
        return authenticationService.signUp(requets);
    }

    @PostMapping("/singin")
    public ResponseEntity<JwtAuhenticationResponse> singin(@RequestBody SigninRequest requets) {
        return ResponseEntity.ok(authenticationService.singIn(requets));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassword resetPassword) {
        return ResponseEntity.ok(authenticationService.resetPassword(resetPassword));
    }

    @PostMapping("/change-password")
    public ResponseObject changePassword(@RequestBody ChangePassword changePassword) {
        return new ResponseObject(authenticationService.changePassword(changePassword));
    }


}
