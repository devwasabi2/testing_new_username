terraform {
  backend "s3" {
    bucket = "bbdplanner"
    key    = "Terraform-State"
    region = "eu-west-1"
  }
}