import tensorflow as tf
from tensorflow import keras

ImageDataGenerator = keras.preprocessing.image.ImageDataGenerator
MobileNetV2 = keras.applications.MobileNetV2
layers = keras.layers
models = keras.models
import json
import os

# Dataset path
dataset_path = "dataset/PlantVillage/PlantVillage"

img_size = (224, 224)
batch_size = 32

# Data generator
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

# Training data
train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=img_size,
    batch_size=batch_size,
    class_mode="categorical",
    subset="training"
)

# Validation data
val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=img_size,
    batch_size=batch_size,
    class_mode="categorical",
    subset="validation"
)

# Automatically read class names
class_names = list(train_data.class_indices.keys())

print("\nDetected Classes:")
print(class_names)

# Save class names for prediction later
os.makedirs("model", exist_ok=True)

with open("model/class_names.json", "w") as f:
    json.dump(class_names, f)

# Load MobileNetV2 base model
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze pretrained layers
base_model.trainable = False

# Build classification model
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.3),
    layers.Dense(train_data.num_classes, activation="softmax")
])

# Compile model
model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# Train model
model.fit(
    train_data,
    validation_data=val_data,
    epochs=10
)

# Save trained model
model.save("model/plant_disease_model.h5")

print("\nModel training complete!")
print("Model saved to: model/plant_disease_model.h5")
print("Class names saved to: model/class_names.json")