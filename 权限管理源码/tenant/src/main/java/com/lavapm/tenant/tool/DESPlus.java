package com.lavapm.tenant.tool;

import java.io.PrintStream;

public class DESPlus {
  int[] datamatrix = new int[64];
  int[] keymatrix = new int[64];
  int[] outdatamatrix = new int[64];
  int[] b = new int[64];
  int[] x = new int[64];
  int[] tem_ri = new int[64];
  int[] tem_key = new int[64];
  int[] tem_matrix = new int[64];
  public static int ENCRYPT = 1;
  public static int DECRYPT = 0;
  
  int[] IP_Tr = { 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7 };
  
  int[] IP_1_Tr = { 40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25 };
  
  int[] Etr = { 32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1 };
  
  int[] PC_1_Tr = { 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 };
  
  int[] PC_2_Tr = { 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 };
  
  int[][] SB = { { 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 }, { 15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 }, { 10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 }, { 7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 }, { 2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 }, { 12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 }, { 4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 }, { 13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 } };
  
  int[] Left_move = { 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 };
  
  int[] right_move = { 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 };
  
  int[] swap = { 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 };
  
  int[] P_Tr = { 16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25 };
  
  private String MainKey = "1122334455667788";
  
  public DESPlus() {
    MainKey = "1134972112051034";
  }
  
  private void myinputtobin(byte[] inputstr, int[] outbin)
  {
    try {
      int i = 0; for (int l = 0; i < 8; i++) {
        int k = inputstr[i];
        for (int j = 0; j < 8; j++) {
          if ((k & 0x80) == 128) {
            outbin[(l++)] = 1;
          } else
            outbin[(l++)] = 0;
          k <<= 1;
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  
  private void memcpy(int[] des, int[] source, int number) {
    for (int i = 0; i < number; i++) {
      des[i] = source[i];
    }
  }
  
  private void transpose(int[] temp_data, int[] matrix, int n) {
    memcpy(tem_matrix, temp_data, 64);
    for (int i = 1; i <= n; i++) {
      temp_data[(i - 1)] = tem_matrix[(matrix[(i - 1)] - 1)];
    }
  }
  
  private void leftmove(int[] key) {
    memcpy(tem_matrix, key, 64);
    for (int i = 0; i < 55; i++)
      tem_matrix[i] = tem_matrix[(i + 1)];
    tem_matrix[27] = key[0];
    tem_matrix[55] = key[28];
    memcpy(key, tem_matrix, 64);
  }
  
  private void rightmove(int[] key)
  {
    memcpy(tem_matrix, key, 64);
    for (int i = 0; i < 55; i++)
      tem_matrix[(55 - i)] = tem_matrix[(54 - i)];
    tem_matrix[0] = key[27];
    tem_matrix[28] = key[55];
    memcpy(key, tem_matrix, 64);
  }
  
  private void des_f(int i, int[] ri_1, int[] key, int[] r_f, int mode)
  {
    memcpy(tem_ri, ri_1, 64);
    transpose(tem_ri, Etr, 48);
    if (mode == ENCRYPT) {
      int q = Left_move[i];
      for (int j = 1; j <= q; j++)
        leftmove(key);
    }
    int q = right_move[i];
    for (int j = 1; j <= q; j++) {
      rightmove(key);
    }
    memcpy(tem_key, key, 64);
    transpose(tem_key, PC_2_Tr, 48);
    for (int j = 0; j < 48; j++) {
      if (tem_ri[j] + tem_key[j] == 1) {
        tem_ri[j] = 1;
      } else
        tem_ri[j] = 0;
    }
    int j = 0;int z = 0;
    for (int y = 0; j < 8; j++) {
      int k = (((((tem_ri[z] << 1) + tem_ri[(z + 5)] << 1) + tem_ri[(z + 1)] << 1) + tem_ri[(z + 2)] << 1) + tem_ri[(z + 3)] << 1) + tem_ri[(z + 4)];
      
      int p = SB[j][k];
      if ((p & 0x8) == 8) {
        r_f[y] = 1;
      } else
        r_f[y] = 0;
      if ((p & 0x4) == 4) {
        r_f[(y + 1)] = 1;
      } else
        r_f[(y + 1)] = 0;
      if ((p & 0x2) == 2) {
        r_f[(y + 2)] = 1;
      } else
        r_f[(y + 2)] = 0;
      if ((p & 0x1) == 1) {
        r_f[(y + 3)] = 1;
      } else
        r_f[(y + 3)] = 0;
      z += 6;
      y += 4;
    }
    transpose(r_f, P_Tr, 32);
  }
  
  private void des(int[] plaintext, int[] key, int[] a, int mode)
  {
    memcpy(a, plaintext, 64);
    transpose(a, IP_Tr, 64);
    transpose(key, PC_1_Tr, 56);
    for (int i = 0; i < 16; i++) {
      memcpy(b, a, 64);
      for (int j = 0; j < 32; j++) {
        a[j] = b[(j + 32)];
      }
      
      des_f(i, a, key, x, mode);
      
      for (int j = 0; j < 32; j++) {
        if (b[j] + x[j] == 1) {
          a[(j + 32)] = 1;
        } else {
          a[(j + 32)] = 0;
        }
      }
    }
    


    transpose(a, swap, 64);
    transpose(a, IP_1_Tr, 64);
  }
  
  private void myouttostr(int[] encrypted_bin, byte[] outstr)
  {
    int i = 0;
    for (int l = 0; i < 8; i++) {
      int j = 0;
      for (int k = 0; j < 8; j++) {
        k = (k << 1) + encrypted_bin[(l++)];
        outstr[i] = ((byte)k);
      }
    }
  }
  
  private void encrypt(int mode, byte[] des_data, byte[] des_key, byte[] des_result)
  {
    myinputtobin(des_data, datamatrix);
    myinputtobin(des_key, keymatrix);
    des(datamatrix, keymatrix, outdatamatrix, mode);
    
    myouttostr(outdatamatrix, des_result);
  }
  
  private static byte[] StringToByte(String Input, int Inlength)
  {
    byte[] retval = new byte[Inlength];
    for (int i = 0; i < Inlength; i++) {
      retval[i] = Integer.decode("0x" + Input.substring(i * 2, i * 2 + 2)).byteValue();
    }
    
    return retval;
  }
  
  private static String sByteToStr(byte[] bIn, int iLen)
  {
    String sRet = "";
    String sTemp = "0123456789ABCDEF";
    int i = 0;int iTemp = 0;
    byte[] bTemp = sTemp.getBytes();
    byte[] bOut = new byte[2 * iLen];
    for (i = 0; i < iLen; i++) {
      iTemp = bIn[i] >> 4 & 0xF;
      bOut[(i * 2)] = bTemp[iTemp];
      iTemp = bIn[i] & 0xF;
      bOut[(i * 2 + 1)] = bTemp[iTemp];
    }
    sRet = new String(bOut);
    return sRet;
  }
  
  private String encrypt(String des_data)
  {
    String des_key = MainKey;
    byte[] s1 = new byte[8];
    String des_result = "";
    encrypt(ENCRYPT, StringToByte(des_data, 8), StringToByte(des_key, 8), s1);
    des_result = sByteToStr(s1, 8);
    return des_result;
  }
  
  public String encrypt(String developerid, String productid)
  {
    String des_data = "";
    
    if ((developerid + productid).length() >= 15) {
      return null;
    }
    des_data = developerid + "A" + productid;
    
    int loop = 16 - des_data.length();
    
    for (int i = 0; i < loop; i++) {
      des_data = des_data + "A";
    }
    String result = encrypt(des_data);
    String appendix = result + encrypt(encrypt(des_data));
    
    return appendix;
  }
  
  public String decrypt(String des_data)
  {
    String des_key = MainKey;
    byte[] s1 = new byte[8];
    String des_result = "";
    
    des_data = des_data.substring(0, 16);
    encrypt(DECRYPT, StringToByte(des_data, 8), StringToByte(des_key, 8), s1);
    des_result = sByteToStr(s1, 8);
    
    String[] result = des_result.split("A");
    
    return result[0] + "+" + result[1];
  }
  
  public static void main(String[] args)
  {
    DESPlus desCrypt1 = new DESPlus();
    try
    {
      String s = desCrypt1.encrypt("2000066", "2001770");
      System.out.println("加密后数据是:" + s);
      String result = desCrypt1.decrypt(s);
      System.out.println("解密后数据---开发者ID和产品ID:[" + result + "]");
    }
    catch (Exception e) {}
  }
}
