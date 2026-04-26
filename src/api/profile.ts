import supabase from "@/lib/supabase.ts";
import { getRandomNickname } from "@/lib/utils.ts";
import { deleteImagesInPath, uploadImage } from "@/api/image.ts";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase.from("profile").select("*").eq("id", userId).single();

  if (error) throw error;
  return data;
}

export async function createProfile(userId: string) {
  const { data, error } = await supabase.from("profile").insert({
    id: userId,
    nickname: getRandomNickname()
  }).select().single();

  if (error) throw error;
  return data;
}

export async function updateProfile({
  userId,
  nickname,
  bio,
  avatarImageFile
}: {
  userId: string;
  nickname?: string;
  bio?: string;
  avatarImageFile?: File;
}) {
  let newAvatarImageUrl: string | undefined;
  if (avatarImageFile) {
    await deleteImagesInPath(`${userId}/avatar`);

    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

    newAvatarImageUrl = await uploadImage({
      file: avatarImageFile,
      filePath
    });
  }

  const { data, error } = await supabase.from("profile").update({
    nickname,
    bio,
    ...(newAvatarImageUrl && { avatar_url: newAvatarImageUrl })
  }).eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}