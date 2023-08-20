package com.example.demo;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextField;
import javafx.scene.control.PasswordField;
import javafx.scene.input.InputEvent;
import javafx.stage.Stage;
import javafx.stage.Window;

import java.io.IOException;


public class HelloController {
    @FXML
    private TextField txLogin;

    @FXML
    private PasswordField pbPassword;

    @FXML
    private RadioButton rbSaveMe;

    @FXML
    protected void click(ActionEvent actionEvetn) throws IOException {
        if (txLogin.getText().equals("Admin") && pbPassword.getText().equals("admin")){
            Node node = (Node) actionEvetn.getSource();
            Stage authStage = (Stage) node.getScene().getWindow();

            FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("WTF.fxml"));
            Scene scene = new Scene(fxmlLoader.load(), 800, 600);
            Stage stage = new Stage();
            stage.setTitle("Новое окно");
            stage.setScene(scene);
            stage.show();
            authStage.close();
        }
        else {
            //Уведомление с ошибкой!
        }
    }
}