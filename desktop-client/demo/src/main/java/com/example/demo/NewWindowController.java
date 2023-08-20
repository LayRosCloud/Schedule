package com.example.demo;

import javafx.animation.FadeTransition;
import javafx.animation.TranslateTransition;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.util.Duration;

import java.net.URL;
import java.util.ResourceBundle;

public class NewWindowController implements Initializable {

    @FXML
    private ImageView avatarImage;

    @FXML
    private Label closeMenu;

    @FXML
    private StackPane navigationMenu;

    @FXML
    private Label openMenu;

    @FXML
    private Button scheduleButton;

    @FXML
    private Button scheduleOfClasses;

    @FXML
    private Label usersNameLabel;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        navigationMenu.setTranslateX(-200);

        openMenu.setOnMouseClicked(event -> {
            TranslateTransition slide = new TranslateTransition();
            slide.setDuration(Duration.seconds(0.3));
            slide.setNode(navigationMenu);
            slide.setToX(0);
            slide.play();

            navigationMenu.setTranslateX(-200);

            slide.setOnFinished(ActionEvent -> {
                openMenu.setVisible(false);
                closeMenu.setVisible(true);
            });
        });

        closeMenu.setOnMouseClicked(event -> {
            TranslateTransition slide = new TranslateTransition();
            slide.setDuration(Duration.seconds(0.3));
            slide.setNode(navigationMenu);
            slide.setToX(-200);
            slide.play();

            navigationMenu.setTranslateX(0);

            slide.setOnFinished(ActionEvent -> {
                openMenu.setVisible(true);
                closeMenu.setVisible(false);
            });
        });
    }

    @FXML
    void scheduleButtonClick(ActionEvent event) {

    }

    @FXML
    void scheduleOfClassesClick(ActionEvent event) {

    }

}

