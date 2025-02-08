import styles from "./EditBlogModal.module.css";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import Textarea from "../../UI/TextArea/Textarea";
import Choice from "../../Modal/Choice";
import InputError from "../../UI/InputError/InputError";
import { useForm } from "react-hook-form";
import useStore from "../../../data/store";
import BlueBorderBtn from "./../../Buttons/BlueBorderBtn/BlueBorderBtn";
import { useRef, useState } from "react";
import usePutPosts from "../../../api/hooks/GeneralHooks/Posts/usePutPosts";
import blueButtonStyles from "../../Buttons/BlueBorderBtn/BlueBorderBtn.module.css";

function EditBlogModal({ post }) {
  const { setModalActive } = useStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(post.image);
  const [photoError, setPhotoError] = useState("");
  const { mutate, isPending } = usePutPosts();
  
  const categories = [
    { value: '1', label: 'Zdrowie' },
    { value: '2', label: 'Lifestyle' },
    { value: '3', label: 'Medycyna' }
  ];
  
  const { register, handleSubmit, control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      title: { value: post.id, label: post.title },
      content: post.shortDescription,
      category: { value: post.category, label: post.category }
    }
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
      id: post.id,
      data: formData
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h1>Edycja bloga</h1>

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
          seeOptions    
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
          <button 
            type="button" 
            onClick={handleImageClick}
            className={blueButtonStyles.btn}
          >
            {selectedImage ? 'Zmień obrazek' : 'Dodaj obrazek'}
          </button>
          {photoError && <div className={styles.errorMessage}>{photoError}</div>}
        </div>
        <Choice
          choice1="Anuluj"
          choice2={isPending ? "Zapisywanie..." : "Zapisz"}
          cb1={closeModal}
          type="submit"
          disabled={isPending}
        />
      </div>
    </form>
  );
}

export default EditBlogModal;
