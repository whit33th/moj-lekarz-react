import styles from "./AddBlogModal.module.css";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import Textarea from "../../UI/TextArea/Textarea";
import Choice from "../../Modal/Choice";
import InputError from "../../UI/InputError/InputError";
import { useForm } from "react-hook-form";
import useStore from "../../../data/store";
import BlueBorderBtn from "./../../Buttons/BlueBorderBtn/BlueBorderBtn";
import { useRef, useState } from "react";
import usePostPosts from "../../../api/hooks/GeneralHooks/Posts/usePostPosts";

function AddBlogModal() {
  const { setModalActive } = useStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const { mutate, isPending } = usePostPosts();
  
  const categories = [
    { value: '1', label: 'Zdrowie' },
    { value: '2', label: 'Lifestyle' },
    { value: '3', label: 'Medycyna' }
  ];
  
  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange",
    
  });

  const closeModal = () => {
    setModalActive(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPhotoError("");  
    }
  };

  const onSubmit = (data) => {
    if (!selectedImage) {
      setPhotoError("Proszę wybrać zdjęcie");
      return;
    }
    
    const formData = {
      title: data.title.label,
      content: data.content,
      photo: selectedImage,
    };

    mutate({
      id: 262,
      data: formData
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h1>Dodanie nowości</h1>

      <div className={styles.inputGroup}>
        <label>Temat</label>
        <InputDropdownStas
          control={control}
          name="title"
          options={[]}
          placeholder="Wybierz temat"
          {...register("title", {
            required: "Treść jest wymagana",
            minLength: {
              value: 10,
              message: "Treść musi mieć minimum 10 znaków",
            },
          })}
        />
        <InputError errorField="title" formState={formState} />
      </div>

      <div className={styles.inputGroup}>
        <label>Kategoria</label>
        <InputDropdownStas
          control={control}
          name="category"
          options={categories}
          placeholder="Wybierz kategorię"
          {...register("category", {
            required: "Kategoria jest wymagana"
          })}
        />
        <InputError errorField="category" formState={formState} />
      </div>

      <div className={styles.inputGroup}>
        <label>Treść</label>
        <Textarea
          resize={false}
          placeholder="Wpisz treść..."
          {...register("content", {
            required: "Treść jest wymagana",
            minLength: {
              value: 10,
              message: "Treść musi mieć minimum 10 znaków",
            },
          })}
        />
        {<InputError errorField="content" formState={formState} />}
      </div>

      <div className={styles.buttonGroup}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
          accept="image/*"
        />
        <div>
          <BlueBorderBtn cb={handleImageClick}>
            {selectedImage ? 'Zmień obrazek' : 'Dodaj obrazek'}
          </BlueBorderBtn>
          {photoError && <div className={styles.errorMessage}>{photoError}</div>}
        </div>
        <Choice
          choice1="Anuluj"
          choice2={isPending ? "Dodawanie..." : "Dodaj"}
          cb1={closeModal}
          type="submit"
          disabled={isPending}
        />
      </div>
    </form>
  );
}

export default AddBlogModal;
