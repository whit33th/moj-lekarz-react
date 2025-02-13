import styles from "./AddBlogModal.module.css";
import InputDropdownStas from "../../Dropdown/InputDropdownStas";
import Textarea from "../../UI/TextArea/Textarea";
import Choice from "../../Modal/Choice";
import InputError from "../../UI/InputError/InputError";
import { useForm } from "react-hook-form";
import useStore from "../../../data/store";
import { useRef, useState, useMemo } from "react";
import usePostPosts from "../../../api/hooks/GeneralHooks/Posts/usePostPosts";
import { useGetCategory } from "../../../api/hooks/GeneralHooks/Posts/useGetCategories";
import blueButtonStyles from "../../Buttons/BlueBorderBtn/BlueBorderBtn.module.css";

function AddBlogModal() {
  const { setModalActive } = useStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const { mutate, isPending } = usePostPosts();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategory();

  const categories = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    }));
  }, [categoriesData]);

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
      categoryId: parseInt(data.category.value), // Send the category ID as a number
      content: data.content,
      photo: selectedImage,
    };

    mutate({
      id: formData.categoryId,
      data: formData,
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
          seeOptions
          options={categories}
          placeholder={
            categoriesLoading ? "Ładowanie kategorii..." : "Wybierz kategorię"
          }
          isLoading={categoriesLoading}
          {...register("category", {
            required: "Kategoria jest wymagana",
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
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept="image/*"
        />
        <div>
          <button 
            type="button" 
            onClick={handleImageClick}
            className={blueButtonStyles.btn}
          >
            {selectedImage ? "Zmień obrazek" : "Dodaj obrazek"}
          </button>
          {photoError && (
            <div className={styles.errorMessage}>{photoError}</div>
          )}
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
