package com.example.demo;

import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;

public class Window {
    private Stage stage;
    public Window(URL pathFXML, String title, int width, int height){
        try{
            FXMLLoader fxmlLoader = new FXMLLoader(pathFXML);
            Scene scene = new Scene(fxmlLoader.load(), width, height);
            stage = new Stage();
            stage.setTitle(title);
            stage.setScene(scene);
        }catch (IOException exception){
            exception.printStackTrace();
        }
    }

    public void setResizable(boolean isResizable){
        stage.setResizable(isResizable);
    }
    public void show(){
        stage.show();
    }

    public void close(){
        stage.close();
    }
}
